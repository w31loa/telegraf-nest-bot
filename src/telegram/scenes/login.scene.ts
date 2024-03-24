import { Injectable } from "@nestjs/common";
import { Ctx, Hears, On, Scene, SceneEnter } from "nestjs-telegraf";
import { ApiService } from "src/api/api.service";
import { MarkService } from "src/mark/mark.service";
import { SubjectService } from "src/subject/subject.service";
import { UserService } from "src/user/user.service";
import { Markup } from "telegraf";
import { SceneContext  } from "telegraf/typings/scenes";
import { TelegramService } from "../telegram.service";


@Injectable()
@Scene('login')
export class LoginScene{
    constructor(private readonly user: UserService ,
                private readonly api: ApiService,
                private readonly subject: SubjectService,
                private readonly mark: MarkService
                ){}

    @SceneEnter()
    async loginEnter(@Ctx() ctx:SceneContext){
        await ctx.replyWithHTML('<u>Введите логин и пароль</u> ✏ (Используйте данные из электронного журнала в формате "логин пароль")', Markup.keyboard([
            ['🚪 Выйти'],
        ]).resize())
    }
    @Hears('🚪 Выйти')
    async exit(@Ctx() ctx:SceneContext){
      
        await ctx.scene.leave()
         ctx.replyWithHTML('Привет, это бот для отслеживания своей успеваемости прямо в Телеграм!\n <i>Для начала нажми кнопку логин😉</i>', Markup.keyboard([
            ['🔐 Логин'],
        ]).resize() ) 

    }

    @On('text')
    async login(@Ctx() ctx:SceneContext){
        //@ts-ignore
       if(ctx.message.text.split(' ').length<2){
            ctx.scene.reenter()
            return
       }

        const  userData = {
            //@ts-ignore
            login: String(ctx.message.text).split(' ')[0],
            //@ts-ignore
            password: String(ctx.message.text).split(' ')[1],
        }

    

        //@ts-ignore
        const user = await this.user.login({username: userData.login , password: userData.password})

        if(!user){
            const message = await ctx.reply('Загрузка данных, пожалуйста подождите....')
            //@ts-ignore
            // console.log(ctx.message)
            const data = await this.api.generateResponse({username: userData.login , userpass: userData.password})
            console.log(data)
            if(data[0] !=undefined){
                const newUser = await this.user.createUser({username: userData.login , password: userData.password})
                const subjects =  await this.subject.createAllSubjectsForUser({marks:data , userId: newUser.id})
                const userMarks = await this.mark.create({marks:data , userId: newUser.id})
                ctx.telegram.editMessageText(message.chat.id, message.message_id , undefined, 'Готово✅ \n '  ).then(()=>{
                    ctx.replyWithHTML('Теперь можете оценить свои успехи в учебе😉', Markup.keyboard([
                        ['📋 Список предметов'],
                        ['♻ Обновить данные'],
                        ['🚪 Выйти'],
                    ]).resize())
                })
                
                //@ts-ignore
                ctx.session.user = {
                    id: newUser.id,
                    username: newUser.username,
                    password: newUser.password
                }
                ctx.scene.leave()
            }
            else{
                ctx.telegram.editMessageText(message.chat.id, message.message_id , undefined, '❌Неправильный логин или пароль❌ \n Повторите ввод 🤨'  )

            }
           

        }else{
            //@ts-ignore 
            ctx.session.user = {
                id: user.id,
                username: user.username,
                password: user.password
            }
            ctx.reply('Готово✅').then(()=>{
                ctx.replyWithHTML('Теперь можете оценить свои успехи в учебе😉', Markup.keyboard([
                    ['📋 Список предметов'],
                    ['♻ Обновить данные'],
                    ['🚪 Выйти'],
                ]).resize())
                 
            })
            ctx.scene.leave()

        }


    

        
        
        //@ts-ignore
    
        //@ts-ignore
        console.log({data: ctx.session.user})   

    } 



  
}