import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MarksService],
  exports: [MarksService]
})
export class MarksModule {}
