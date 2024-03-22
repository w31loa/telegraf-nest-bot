import { Controller, Get, Post } from '@nestjs/common';
import { IAllMarks } from 'src/types/types';
import { MarkService } from './mark.service';
import { ApiService } from 'src/api/api.service';

@Controller('mark')
export class MarkController {

    constructor(private readonly marks:MarkService,
                private readonly api:ApiService){}

   

    @Post()
    async crete(){
        const data = await this.api.generateResponse({username: 'turukaloms' , userpass: 'kUzQL0OIWI'})
        return this.marks.create({marks: data, userId: 105})
    }
    @Get()
    adas(){
        return this.marks.getAllMarksBySubjectId(3)
    }
}
