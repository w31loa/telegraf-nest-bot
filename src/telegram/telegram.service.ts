import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update ,On ,Message, Action, Hears, Command } from "nestjs-telegraf";
import { ApiService } from 'src/api/api.service';
import {Markup, Scenes, Telegraf } from 'telegraf'
import { getKeyboardWithMarks, getKeyboardWithSubjects } from './talagram.keyboard';
import { MarkService } from 'src/mark/mark.service';
import { IMark } from 'src/types/types';
import { SubjectService } from 'src/subject/subject.service';
import { SceneContext, Stage } from 'telegraf/typings/scenes';
import { LoginScene } from './scenes/login.scene';
import { User } from '@prisma/client';
import { getMarksTable } from './helpers/table.helper';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs'
import * as path from 'path';


type Context = Scenes.SceneContext


@Update()
export class TelegramService extends Telegraf<Context> {

    constructor(private readonly configService:ConfigService, 
                private readonly marksService:ApiService ,
                private readonly mark:MarkService,
                private readonly subject: SubjectService,
                private readonly api: ApiService,
                private readonly loginScene: LoginScene ){
        super(configService.get('TELEGRAM_KEY'))  
    }


    private subjectMessage

    @Start()
    onStart(@Ctx() ctx:Context){ 
          
        ctx.replyWithHTML('Привет, это бот для отслеживания своей успеваемости прямо в Телеграм!\n <i>Для начала нажми кнопку логин😉</i>', Markup.keyboard([
            ['🔐 Логин'],
        ]).resize() ) 
         ctx.state
    }



    // @On('sticker') 
    // async onStiker(@Message('stiker') message,@Ctx() ctx:Context){
    //      //@ts-ignore
    //     const user = ctx.session.user as User
    //     if(user){
    //       const subjects = await this.subject.getAllSubjectsByUserId(+user.id)


    //       ctx.reply('крсава', {
    //         reply_markup:{
    //           inline_keyboard: 
    //             getKeyboardWithSubjects(subjects)
    //           ,
    //         }
    //       })
    //     }
    //     else{
    //       ctx.reply('Авторизуйся друг❤')
    //     }
      
    // }

    @Hears('🔐 Логин')
    async callLoginScene(@Ctx() ctx:SceneContext){
        ctx.scene.enter('login')
        return

    }

    @Hears('🚪 Выйти')
    async exit(@Ctx() ctx:SceneContext){
      
        return this.onStart(ctx)

    }

    @Hears('♻ Обновить данные')
    async marksUpdate(@Ctx() ctx:SceneContext){
          //@ts-ignore
          const user = ctx.session.user as User
          if(user){
            const message = await ctx.reply('Загрузка данных, пожалуйста подождите....')
            const data = await this.api.generateResponse({username: user.username , userpass: user.password})
            if(data[0] !=undefined){
              await this.subject.reloadSubjects({marks:data , userId: user.id})
               await this.mark.reloadMarks({marks:data , userId: user.id})
              ctx.telegram.editMessageText(message.chat.id, message.message_id , undefined, 'Готово✅ \n '  ).then(()=>{
                  ctx.replyWithHTML('Теперь можете оценить свои успехи в учебе😉')
              })
            }
          }else{
            ctx.reply('Авторизуйся друг❤')
          }
        return

    }
    @Hears('📋 Список предметов')
    async getSubjects(@Ctx() ctx:SceneContext){
          //@ts-ignore
          const user = ctx.session.user as User
          if(user){
            const subjects = await this.subject.getAllSubjectsByUserId(+user.id)
  
  
            this.subjectMessage  = await ctx.replyWithHTML('📚 <u>Список предметов</u> 📚', {
              reply_markup:{
                inline_keyboard: 
                  getKeyboardWithSubjects(subjects)
                ,
              }
            })
            console.log( this.subjectMessage)
          }
          else{
            ctx.reply('Авторизуйся друг❤')
          }

    }

    @On('callback_query')
    async sda( @Ctx() ctx:Context){
      //@ts-ignore
      const callback = {
          //@ts-ignore
          type: ctx.callbackQuery.data.split('_')[0],
          //@ts-ignore
          id: ctx.callbackQuery.data.split('_')[1]
      }
      //@ts-ignore

      // console.log(ctx.callbackQuery.data)

      if(callback.type == 'subjectId'){

        // console.log()
        ctx.deleteMessage(this.subjectMessage.message_id)

        const subjectId = +callback.id

        const marks:IMark[] = await this.mark.getAllMarksBySubjectId(subjectId) 
    
        const subject = await this.subject.getSubjectById(subjectId)
  
        ctx.replyWithHTML(`<b>${subject.title}</b>`, {
          reply_markup:{
        //@ts-ignore
            inline_keyboard: 
              getKeyboardWithMarks(marks , +subjectId)
            ,
          }
        })
      }

      if(callback.type == 'table'){
        const subjectId = +callback.id

        const marks:IMark[] = await this.mark.getAllMarksBySubjectId(subjectId) 
        const subject = await this.subject.getSubjectById(subjectId)
        // ctx.reply(`${subjectId}`)

        const table = getMarksTable(marks , subject.title)

        ctx.replyWithHTML(table , {parse_mode:'MarkdownV2'})
      }

 
    }

    @Cron(CronExpression.EVERY_12_HOURS, {timeZone: 'Europe/Moscow'})
    async automaticlyUpdate(){
         //@ts-ignore
         const user = ctx.session.user as User
         if(user){
           const data = await this.api.generateResponse({username: user.username , userpass: user.password})
           if(data[0] !=undefined){
             await this.subject.reloadSubjects({marks:data , userId: user.id})
              await this.mark.reloadMarks({marks:data , userId: user.id})
            console.log(`data for user ${user.id} updated`)
           }
         }
    }



    @Hears('Z')
    async rossia(@Ctx() ctx:Context){
      const filepath = path.resolve(process.cwd(),'z.mp3')
      ctx.replyWithAudio({source: filepath})
    }

    @On('message')
    async onMessage(@Message('text') message : string, @Ctx() ctx:Context){
        // const marks = await 
       await ctx.replyWithHTML('🚨 Нет такой команды 🚨')
    }
}
