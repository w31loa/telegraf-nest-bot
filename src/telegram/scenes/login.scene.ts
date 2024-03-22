import { Injectable } from "@nestjs/common";
import { Ctx, On, Scene, SceneEnter } from "nestjs-telegraf";
import { ApiService } from "src/api/api.service";
import { MarkService } from "src/mark/mark.service";
import { SubjectService } from "src/subject/subject.service";
import { UserService } from "src/user/user.service";
import { SceneContext } from "telegraf/typings/scenes";


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
        await ctx.reply('Введите логин в пароль (Используйте данные из электронного журнала в формате "логин пароль")')
    }

    @On('text')
    async login(@Ctx() ctx:SceneContext){



        const userData = {
            //@ts-ignore
            login: String(ctx.message.text).split(' ')[0],
            //@ts-ignore
            password: String(ctx.message.text).split(' ')[1],
        }


        const user = await this.user.login({username: userData.login , password: userData.password})

        if(!user){
            const message = await ctx.reply('Загрузка данных, пожалуйста подождите....')
            //@ts-ignore
            // console.log(ctx.message)
            const marks = await this.api.generateResponse({username: userData.login , userpass: userData.password})
            
            const newUser = await this.user.createUser({username: userData.login , password: userData.password})
            const subjects =  await this.subject.createAllSubjectsForUser({marks , userId: newUser.id})
            const userMarks = await this.mark.create({marks , userId: newUser.id})
            ctx.telegram.editMessageText(message.chat.id, message.message_id , undefined, 'Готово!!!'  )
            //@ts-ignore
            ctx.session.user = {
                id: newUser.id,
                username: newUser.username,
                password: newUser.password
            }
            ctx.scene.leave()

        }else{
            //@ts-ignore
            ctx.session.user = {
                id: user.id,
                username: user.username,
                password: user.password
            }
            ctx.reply('Готово!!!')
            ctx.scene.leave()

        }


        
        
        //@ts-ignore
    
        //@ts-ignore
        console.log({data: ctx.session.user})   

    } 

  
}