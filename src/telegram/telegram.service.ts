import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update ,On ,Message} from "nestjs-telegraf";
import { MarksService } from 'src/marks/marks.service';
import {Scenes, Telegraf} from 'telegraf'

type Context = Scenes.SceneContext


@Update()
export class TelegramService extends Telegraf<Context>{

    constructor(private readonly configService:ConfigService, private readonly marksService:MarksService){
        super(configService.get('TELEGRAM_KEY'))
    }

    @Start()
    onStart(@Ctx() ctx:Context){ 
         ctx.replyWithHTML(`<b>Привет, ${ctx.from.first_name}</b>`)
    }

    @On('text')
    async onMessage(@Message('text') message : string, @Ctx() ctx:Context){
        // const marks = await 
      this.marksService.generateResponse({'username': "BARANNIKAP" , 'userpass': `1dbf71922928df9ce9e0e8303bb2c84f02184f8e`}).then(data=>{
        console.log(data['Иностранный язык'][1].date)

        const replyStr:string = `${data['Иностранный язык'][1].date}: ${data['Иностранный язык'][1].mark}`
        ctx.replyWithHTML(replyStr)
      })
        // this.marksService.test().then(data=>{
        //     console.log(data)
        // })
    }
}
