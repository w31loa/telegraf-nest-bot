import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {

    constructor(private readonly api: ApiService){}


    @Get()
    async text(){
        return await this.api.generateResponse({username: 'BARANNIKAP', userpass : '6TwDEcO8Ac'})
    }


}
