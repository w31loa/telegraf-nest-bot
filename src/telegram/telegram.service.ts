import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update ,On ,Message, Action, Hears, Command} from "nestjs-telegraf";
import { ApiService } from 'src/api/api.service';
import {Markup, Scenes, Telegraf} from 'telegraf'
import { getKeyboardWithMarks, getKeyboardWithSubjects } from './talagram.keyboard';
import { MarkService } from 'src/mark/mark.service';
import { IMark } from 'src/types/types';
import { SubjectService } from 'src/subject/subject.service';
import { SceneContext, Stage } from 'telegraf/typings/scenes';
import { LoginScene } from './scenes/login.scene';
import { User } from '@prisma/client';

type Context = Scenes.SceneContext


@Update()
export class TelegramService extends Telegraf<Context> {

  data = [
    {
      "id": 3,
      "title": "Иностранный язык",
      "userId": 1
    },
    {
      "id": 4,
      "title": "Программирование",
      "userId": 1
    }
  ]

    constructor(private readonly configService:ConfigService, 
                private readonly marksService:ApiService ,
                private readonly mark:MarkService,
                private readonly subject: SubjectService,
                private readonly loginScene: LoginScene ){
        super(configService.get('TELEGRAM_KEY'))  
        
    }

    // stage = new Stage(this.loginScene)

    @Start()
    onStart(@Ctx() ctx:Context){ 
          
        ctx.replyWithHTML('Привет, это бот для просмотра своей успеваемости прямо в Телеграм!\n <i>Для начала нажми кнопку логин😉</i>', Markup.keyboard([
            ['🔐 Логин'],
        ]).resize() ) 
         ctx.state
    }
    // @On('sticker')
    // onStiker(@Message('stiker') message,@Ctx() ctx:Context){
    //   ctx.replyWithHTML(`              Выберите предмет             `, Markup.inlineKeyboard([
    //       Markup.button.callback("Русский", 'lesson1'), 
    //       Markup.button.callback('Математика', 'lesson2'),
    //       Markup.button.callback('МДК', 'lesson3'),
    //       Markup.button.callback('Англиский', 'lesson4'), 
    //     ])
    //   )
    // }  
    @On('sticker') 
    async onStiker(@Message('stiker') message,@Ctx() ctx:Context){
         //@ts-ignore
        const user = ctx.session.user as User
        if(user){
          const subjects = await this.subject.getAllSubjectsByUserId(+user.id)


          ctx.reply('крсава', {
            reply_markup:{
              inline_keyboard: 
                getKeyboardWithSubjects(subjects)
              ,
            }
          })
        }
        else{
          ctx.reply('Авторизуйся друг❤')
        }
      
    }

    // @Hears('/key')
    // async onHears(@Ctx() ctx: Context) {
   
    // }

    @Hears('🔐 Логин')
    async callLoginScene(@Ctx() ctx:SceneContext){
        ctx.scene.enter('login')
        return

    }
    @Hears('Обновить данные')
    async marksUpdate(@Ctx() ctx:SceneContext){
        // ctx.scene.enter('login')
        return

    }
    @Hears('📋 Список предметов')
    async getSubjects(@Ctx() ctx:SceneContext){
          //@ts-ignore
          const user = ctx.session.user as User
          if(user){
            const subjects = await this.subject.getAllSubjectsByUserId(+user.id)
  
  
            ctx.replyWithHTML('📚 <u>Список предметов</u> 📚', {
              reply_markup:{
                inline_keyboard: 
                  getKeyboardWithSubjects(subjects)
                ,
              }
            })
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

      console.log(ctx.callbackQuery.data)

      if(callback.type == 'subjectId'){
        const subjectId = +callback.id

        const marks:IMark[] = await this.mark.getAllMarksBySubjectId(subjectId) 
    
  
        const subject = await this.subject.getSubjectById(subjectId)
  
  
        // ctx.replyWithHTML(`${marks.map(el=> ` 🤓${el.mark}  📅 ${el.date}\t \n`)}` , {parse_mode:'MarkdownV2'})
  
        // let table = '```🤓Оценки\n| ✅Оценка | 📅Дата |\n'
  
        // marks.forEach(el=>{
        //   table+= `|     ${el.mark}     |   ${el.date.length<5?el.date+' ': el.date}  |\n`
        // })
        // table+='```'
        // let table = '```🤓Оценки\n✅Оценка       📅Дата\n'
  
        // marks.forEach(el=>{
        //   table+= `     ${el.mark}           ${el.date}      \n`
        // })
        // table+='```'
     
  
  
        // ctx.replyWithHTML('```🤓Оценки\n✅Оценка       📅Дата\n     5           11.12      \n     5           11.12      \n     5           11.12      \n```' , {parse_mode:'MarkdownV2'})
        // ctx.replyWithHTML(table , {parse_mode:'MarkdownV2'})
        ctx.reply(subject.title, {
          reply_markup:{
        //@ts-ignore
            inline_keyboard: 
              getKeyboardWithMarks(marks)
            ,
          }
        })
        // ctx.replyWithHTML(table , {parse_mode:'HTML'})
   
        // console.log(ctx.callbackQuery.data)
      }
 
    }


    @Action('callback_query')
    async onAction(@Ctx() ctx:Context ){
      // this.marksService.generateResponse({'username': "BARANNIKAP" , 'userpass': `1dbf71922928df9ce9e0e8303bb2c84f02184f8e`}).then(data=>{
      //   // console.log(data['Иностранный язык'])

      //   const replyStr:string = `${data['Иностранный язык'][13].date}: ${data['Иностранный язык'][13].mark}`
      //   ctx.replyWithHTML(replyStr)
        console.log(123)
      // })

    }

    // @On('text')
    // async onMessage(@Message('text') message : string, @Ctx() ctx:Context){
    //     // const marks = await 
    //   this.marksService.generateResponse({'username': "BARANNIKAP" , 'userpass': `1dbf71922928df9ce9e0e8303bb2c84f02184f8e`}).then(data=>{
    //     console.log(data['Иностранный язык'])

    //     const replyStr:string = `${data['Иностранный язык'][13].date}: ${data['Иностранный язык'][13].mark}`
    //     ctx.replyWithHTML(replyStr)
        
    //   })
        // this.marksService.test().then(data=>{
        //     console.log(data)
        // })
    // }
}
