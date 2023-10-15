import { ConfigService } from "@nestjs/config";
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from "nestjs-telegraf/dist/interfaces";

const telegrafModuleOptions  = (config:ConfigService) : TelegrafModuleOptions =>{
    return {
        token: config.get('TELEGRAM_KEY'),
    }
}


export const options = ():TelegrafModuleAsyncOptions=> { // работа с енв файлами
    return {
        inject: [ConfigService],
        useFactory: (config:ConfigService) =>{
            return telegrafModuleOptions(config)
        }
    }
}