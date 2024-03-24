import { Controller, Get, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { IAllMarks } from 'src/types/types';



@Controller('subject')
export class SubjectController {

    constructor(private readonly subService:SubjectService){}

   

    @Post()
    createAllSubjectsForUser(){
    //    return this.subService.createAllSubjectsForUser({marks:this.data, userId:1})
    }

    @Get()
    getAllSubjectsByUserId(){
        return this.subService.getAllSubjectsByUserId(1)
    }

    @Get('all')
    getAllWithMarks(){
        return this.subService.getAllSubjectsWithMarks(1)
    }

}
