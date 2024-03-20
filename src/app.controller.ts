import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiService } from './api/api.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly mark :ApiService) {}

  @Get()
  getHello() {

    

    return this.appService.getHello()
  }
}
