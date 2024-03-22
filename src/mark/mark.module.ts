import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubjectModule } from 'src/subject/subject.module';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [PrismaModule, SubjectModule, ApiModule],
  providers: [MarkService],
  controllers: [MarkController],
  exports: [MarkService]
})
export class MarkModule {}
