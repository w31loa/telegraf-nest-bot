import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAllMarks } from 'src/types/types';

@Injectable()
export class SubjectService {
    constructor(private readonly prisma:PrismaService){}

    
    async create(marks:IAllMarks){
        this.prisma.subject.createMany{
            
        }
    }


}
