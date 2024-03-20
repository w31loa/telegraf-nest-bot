import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update ,On ,Message, Action, Hears} from "nestjs-telegraf";
import { ApiService } from 'src/api/api.service';
import {Markup, Scenes, Telegraf} from 'telegraf'

type Context = Scenes.SceneContext


@Update()
export class TelegramService extends Telegraf<Context>{

    constructor(private readonly configService:ConfigService, private readonly marksService:ApiService){
        super(configService.get('TELEGRAM_KEY'))
    }

    @Start()
    onStart(@Ctx() ctx:Context){ 
         ctx.replyWithHTML(`<b>Привет, ${ctx.from.first_name}</b>`)
         ctx.state
    }
    @On('sticker')
    onStiker(@Message('stiker') message,@Ctx() ctx:Context){
      ctx.replyWithHTML(`              Выберите предмет             `, Markup.inlineKeyboard([
          Markup.button.callback("Русский", 'lesson1'),
          Markup.button.callback('Математика', 'lesson2'),
          Markup.button.callback('МДК', 'lesson3'),
          Markup.button.callback('Англиский', 'lesson4'),
        ])
      )
    }

    @Hears('/key')
    async onHears(@Ctx() ctx: Context) {
      ctx.replyWithHTML('Привет', Markup.keyboard([
        ['Логин', 'Перезагрузить список оценок'],
        ['Выход']
    ]).resize() ) 
    }

    @Action('lesson4')
    async onAction(@Ctx() ctx:Context){
      this.marksService.generateResponse({'username': "BARANNIKAP" , 'userpass': `1dbf71922928df9ce9e0e8303bb2c84f02184f8e`}).then(data=>{
        // console.log(data['Иностранный язык'])

        const replyStr:string = `${data['Иностранный язык'][13].date}: ${data['Иностранный язык'][13].mark}`
        ctx.replyWithHTML(replyStr)
        
      })
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
