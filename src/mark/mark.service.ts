import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectService } from 'src/subject/subject.service';
import { IAllMarks } from 'src/types/types';

interface Params{
    marks:IAllMarks[]
    userId: number
}

@Injectable()
export class MarkService {

    constructor(private readonly prisma:PrismaService,
                private readonly subject:SubjectService){}


    async create({marks, userId}:Params){

        const subjects = await this.subject.getAllSubjectsByUserId(userId)
        let data = []

        marks.forEach(subject=>{
            const subjectId = subjects.filter(el=> el.title == subject.subjectName)
           subject.subjectName = String(subjectId[0].id)
           subject.marks.forEach(el=>{
                data.push({subjectId: subjectId[0].id , mark: el.mark , date: el.date})
           })
        })


        
        
        return await this.prisma.mark.createMany({data})
        return data
    }
}
