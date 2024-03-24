import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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
                data.push({subjectId: subjectId[0].id , mark: el.mark?el.mark:'' , date: el.date})
           })
        })


        
        // return data
        return await this.prisma.mark.createMany({data})
    }


    async reloadMarks({marks, userId}:Params){
        await this.prisma.mark.deleteMany({
            where:{
                subject:{
                    userId
                }
            }
        })

        return await this.create({marks, userId})
    }

  


    async getAllMarksBySubjectId( subjectId){
        return await this.prisma.mark.findMany({
            where:{
                subjectId,
                
            }
        })
    }
}
