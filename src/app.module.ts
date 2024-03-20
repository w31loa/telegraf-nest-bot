import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SubjectModule } from './subject/subject.module';
import { MarkModule } from './mark/mark.module';

@Module({
  imports: [
    TelegramModule, 
    ConfigModule.forRoot({isGlobal:true}), ApiModule, PrismaModule, UserModule, SubjectModule, MarkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
