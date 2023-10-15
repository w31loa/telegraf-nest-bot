import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { MarksModule } from './marks/marks.module';

@Module({
  imports: [
    TelegramModule, 
    ConfigModule.forRoot({isGlobal:true}), MarksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
