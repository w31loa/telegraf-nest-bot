import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubjectController } from './subject.controller';

@Module({
  imports: [PrismaModule],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports:[SubjectService]
})
export class SubjectModule {}
