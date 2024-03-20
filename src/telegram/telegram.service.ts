import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update ,On ,Message, Action, Hears} from "nestjs-telegraf";
import { ApiService } from 'src/api/api.service';
import {Markup, Scenes, Telegraf} from 'telegraf'
import { getKeyboardWithSubjects } from './talagram.halper';
import { MarkService } from 'src/mark/mark.service';
import { IMark } from 'src/types/types';

type Context = Scenes.SceneContext


@Update()
export class TelegramService extends Telegraf<Context>{

  data = [
    {
      "id": 1,
      "title": "Иностранный язык",
      "userId": 1
    },
    {
      "id": 2,
      "title": "Программирование",
      "userId": 1
    }
  ]

    constructor(private readonly configService:ConfigService, private readonly marksService:ApiService , private readonly mark:MarkService ){
        super(configService.get('TELEGRAM_KEY'))
    }

    @Start()
    onStart(@Ctx() ctx:Context){ 
         ctx.replyWithHTML(`<b>Привет, ${ctx.from.first_name}</b>`)
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
    onStiker(@Message('stiker') message,@Ctx() ctx:Context){
      ctx.reply('крсава', {
        reply_markup:{
          inline_keyboard: [
            getKeyboardWithSubjects(this.data)
          ],
        }
      })
      
    }

    @Hears('/key')
    async onHears(@Ctx() ctx: Context) {
      ctx.replyWithHTML('Привет', Markup.keyboard([
        ['Логин', 'Перезагрузить список оценок'],
        ['Выход']
    ]).resize() ) 
    }

    @On('callback_query')
    async sda( @Ctx() ctx:Context){
      //@ts-ignore
      const data:IMark[] = await this.mark.getAllMarksBySubjectId(+ctx.callbackQuery.data) 
      
      const marks = data.filter(el=> el.mark!='')

      // ctx.replyWithHTML(`${marks.map(el=> ` 🤓${el.mark}  📅 ${el.date}\t \n`)}` , {parse_mode:'MarkdownV2'})
      ctx.replyWithHTML('``` one          1      \ntwo          2      three        3      ```' , {parse_mode:'MarkdownV2'})
      // ctx.answerCbQuery(`оценка:22 дата:11`, {show_alert: true})
      // console.log(ctx.callbackQuery.data)
      console.log(marks)
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
