import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { ApiModule } from 'src/api/api.module';
import { MarkModule } from 'src/mark/mark.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    ApiModule,
    MarkModule
  ],
  providers: [TelegramService]
})
export class TelegramModule {}
