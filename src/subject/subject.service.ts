import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAllMarks } from 'src/types/types';


interface Params{
    marks:IAllMarks[]
    userId: number
}

@Injectable()
export class SubjectService {
    constructor(private readonly prisma:PrismaService){}

    format(title, userId){
        return {title,userId}
    }
    
    async createAllSubjectsForUser({marks, userId}:Params){

        const subjects = marks.map(el =>this.format(el.subjectName, userId))

        console.log(subjects)
        return await this.prisma.subject.createMany({
            data: subjects     
        })
    }

    
    async reloadSubjects({marks, userId}:Params){

        await this.prisma.subject.deleteMany({
            where:{
                userId
            }
        })

        return await this.createAllSubjectsForUser({marks, userId})

    }


    async getSubjectById(id){
        return await this.prisma.subject.findUnique({
            where:{
                id
            }
        })
    }

    async getAllSubjectsByUserId(id:number){
       const subjects=  await this.prisma.subject.findMany({
            where:{
                userId: id
            }
        })

        return subjects
    }

    async getAllSubjectsWithMarks(userId: number){
        return this.prisma.subject.findMany({
            where:{
                userId
            },
            include:{
                marks: true
            }
        })
    }

}
