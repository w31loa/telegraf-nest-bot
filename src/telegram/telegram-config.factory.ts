import { ConfigService } from "@nestjs/config";
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from "nestjs-telegraf/dist/interfaces";
import { sessionMiddleware } from "./middlewares/session.middleware";

const telegrafModuleOptions  = (config:ConfigService) : TelegrafModuleOptions =>{
    return {
        token: config.get('TELEGRAM_KEY'),
        middlewares: [sessionMiddleware]
    }
}


export const options = ():TelegrafModuleAsyncOptions=> { // работа с енв файлами
    return {
        inject: [ConfigService],
        useFactory: (config:ConfigService) =>{
            return telegrafModuleOptions(config)
        },
        
    }
}