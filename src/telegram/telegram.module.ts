import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { MarksModule } from 'src/marks/marks.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    MarksModule
  ],
  providers: [TelegramService]
})
export class TelegramModule {}
