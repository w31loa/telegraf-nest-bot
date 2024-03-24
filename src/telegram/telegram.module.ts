import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { ApiModule } from 'src/api/api.module';
import { MarkModule } from 'src/mark/mark.module';
import { SubjectModule } from 'src/subject/subject.module';
import { LoginScene } from './scenes/login.scene';
import { UserModule } from 'src/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    ScheduleModule.forRoot(),
    ApiModule,
    MarkModule,
    SubjectModule,
    UserModule
  ],
  providers: [TelegramService, LoginScene]
})
export class TelegramModule {}
