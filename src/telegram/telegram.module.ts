import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    ApiModule
  ],
  providers: [TelegramService]
})
export class TelegramModule {}
