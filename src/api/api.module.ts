import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { ApiController } from './api.controller';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
