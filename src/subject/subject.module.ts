import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SubjectService]
})
export class SubjectModule {}
