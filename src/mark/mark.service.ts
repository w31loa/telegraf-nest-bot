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

    data:IAllMarks[] = [
        {
            "subjectName": "Иностранный язык",
            "marks": [
                {
                    "mark": "",
                    "date": ""
                },
                {
                    "date": "01.09",
                    "mark": ""
                },
                {
                    "date": "02.09",
                    "mark": ""
                },
                {
                    "date": "04.09",
                    "mark": ""
                },
                {
                    "date": "04.09",
                    "mark": ""
                },
                {
                    "date": "05.09",
                    "mark": ""
                },
                {
                    "date": "05.09",
                    "mark": ""
                },
                {
                    "date": "06.09",
                    "mark": ""
                },
                {
                    "date": "06.09",
                    "mark": ""
                },
                {
                    "date": "08.09",
                    "mark": ""
                },
                {
                    "date": "08.09",
                    "mark": ""
                },
                {
                    "date": "11.09",
                    "mark": ""
                },
                {
                    "date": "11.09",
                    "mark": ""
                },
                {
                    "date": "12.09",
                    "mark": ""
                },
                {
                    "date": "13.09",
                    "mark": ""
                },
                {
                    "date": "13.09",
                    "mark": ""
                },
                {
                    "date": "14.09",
                    "mark": "Н"
                },
                {
                    "date": "15.09",
                    "mark": ""
                },
                {
                    "date": "15.09",
                    "mark": ""
                },
                {
                    "date": "16.09",
                    "mark": ""
                },
                {
                    "date": "16.09",
                    "mark": ""
                },
                {
                    "date": "16.09",
                    "mark": ""
                },
                {
                    "date": "18.09",
                    "mark": ""
                },
                {
                    "date": "19.09",
                    "mark": ""
                },
                {
                    "date": "20.09",
                    "mark": ""
                },
                {
                    "date": "21.09",
                    "mark": ""
                },
                {
                    "date": "22.09",
                    "mark": ""
                },
                {
                    "date": "23.09",
                    "mark": "Н"
                },
                {
                    "date": "25.09",
                    "mark": ""
                },
                {
                    "date": "26.09",
                    "mark": ""
                },
                {
                    "date": "27.09",
                    "mark": ""
                },
                {
                    "date": "28.09",
                    "mark": "5"
                },
                {
                    "date": "29.09",
                    "mark": ""
                },
                {
                    "date": "29.09",
                    "mark": ""
                },
                {
                    "date": "30.09",
                    "mark": ""
                },
                {
                    "date": "02.10",
                    "mark": ""
                },
                {
                    "date": "03.10",
                    "mark": ""
                },
                {
                    "date": "03.10",
                    "mark": ""
                },
                {
                    "date": "03.10",
                    "mark": ""
                },
                {
                    "date": "06.10",
                    "mark": ""
                },
                {
                    "date": "06.10",
                    "mark": ""
                },
                {
                    "date": "06.10",
                    "mark": ""
                },
                {
                    "date": "07.10",
                    "mark": "Н"
                },
                {
                    "date": "09.10",
                    "mark": ""
                },
                {
                    "date": "10.10",
                    "mark": ""
                },
                {
                    "date": "11.10",
                    "mark": ""
                },
                {
                    "date": "12.10",
                    "mark": ""
                },
                {
                    "date": "12.10",
                    "mark": "5"
                },
                {
                    "date": "13.10",
                    "mark": ""
                },
                {
                    "date": "13.10",
                    "mark": ""
                },
                {
                    "date": "14.10",
                    "mark": ""
                },
                {
                    "date": "16.10",
                    "mark": ""
                },
                {
                    "date": "16.10",
                    "mark": ""
                },
                {
                    "date": "17.10",
                    "mark": ""
                },
                {
                    "date": "17.10",
                    "mark": ""
                },
                {
                    "date": "18.10",
                    "mark": "2"
                },
                {
                    "date": "19.10",
                    "mark": ""
                },
                {
                    "date": "20.10",
                    "mark": ""
                },
                {
                    "date": "20.10",
                    "mark": ""
                },
                {
                    "date": "21.10",
                    "mark": "2"
                },
                {
                    "date": "23.10",
                    "mark": ""
                },
                {
                    "date": "23.10",
                    "mark": ""
                },
                {
                    "date": "24.10",
                    "mark": ""
                },
                {
                    "date": "25.10",
                    "mark": ""
                },
                {
                    "date": "26.10",
                    "mark": ""
                },
                {
                    "date": "26.10",
                    "mark": "Н"
                },
                {
                    "date": "27.10",
                    "mark": ""
                },
                {
                    "date": "27.10",
                    "mark": ""
                },
                {
                    "date": "27.10",
                    "mark": ""
                },
                {
                    "date": "28.10",
                    "mark": ""
                },
                {
                    "date": "28.10",
                    "mark": ""
                },
                {
                    "date": "30.10",
                    "mark": ""
                },
                {
                    "date": "30.10",
                    "mark": ""
                },
                {
                    "date": "31.10",
                    "mark": ""
                },
                {
                    "date": "31.10",
                    "mark": ""
                },
                {
                    "date": "01.11",
                    "mark": " 4"
                },
                {
                    "date": "02.11",
                    "mark": ""
                },
                {
                    "date": "03.11",
                    "mark": ""
                },
                {
                    "date": "03.11",
                    "mark": ""
                },
                {
                    "date": "07.11",
                    "mark": ""
                },
                {
                    "date": "08.11",
                    "mark": ""
                },
                {
                    "date": "08.11",
                    "mark": ""
                },
                {
                    "date": "08.11",
                    "mark": ""
                },
                {
                    "date": "09.11",
                    "mark": ""
                },
                {
                    "date": "09.11",
                    "mark": "Н"
                },
                {
                    "date": "10.11",
                    "mark": ""
                },
                {
                    "date": "10.11",
                    "mark": ""
                },
                {
                    "date": "10.11",
                    "mark": ""
                },
                {
                    "date": "11.11",
                    "mark": ""
                },
                {
                    "date": "11.11",
                    "mark": ""
                },
                {
                    "date": "13.11",
                    "mark": ""
                },
                {
                    "date": "13.11",
                    "mark": ""
                },
                {
                    "date": "14.11",
                    "mark": ""
                },
                {
                    "date": "16.11",
                    "mark": ""
                },
                {
                    "date": "17.11",
                    "mark": ""
                },
                {
                    "date": "18.11",
                    "mark": "4"
                },
                {
                    "date": "20.11",
                    "mark": ""
                },
                {
                    "date": "21.11",
                    "mark": "О"
                },
                {
                    "date": "22.11",
                    "mark": ""
                },
                {
                    "date": "23.11",
                    "mark": "Н"
                },
                {
                    "date": "24.11",
                    "mark": ""
                },
                {
                    "date": "24.11",
                    "mark": ""
                },
                {
                    "date": "27.11",
                    "mark": ""
                },
                {
                    "date": "27.11",
                    "mark": ""
                },
                {
                    "date": "28.11",
                    "mark": ""
                },
                {
                    "date": "29.11",
                    "mark": ""
                },
                {
                    "date": "29.11",
                    "mark": ""
                },
                {
                    "date": "30.11",
                    "mark": ""
                },
                {
                    "date": "01.12",
                    "mark": ""
                },
                {
                    "date": "01.12",
                    "mark": ""
                },
                {
                    "date": "01.12",
                    "mark": ""
                },
                {
                    "date": "02.12",
                    "mark": ""
                },
                {
                    "date": "04.12",
                    "mark": ""
                },
                {
                    "date": "05.12",
                    "mark": "5"
                },
                {
                    "date": "06.12",
                    "mark": ""
                },
                {
                    "date": "06.12",
                    "mark": ""
                },
                {
                    "date": "07.12",
                    "mark": ""
                },
                {
                    "date": "07.12",
                    "mark": " О"
                },
                {
                    "date": "09.12",
                    "mark": ""
                },
                {
                    "date": "11.12",
                    "mark": ""
                },
                {
                    "date": "11.12",
                    "mark": ""
                },
                {
                    "date": "12.12",
                    "mark": ""
                },
                {
                    "date": "12.12",
                    "mark": ""
                },
                {
                    "date": "13.12",
                    "mark": ""
                },
                {
                    "date": "15.12",
                    "mark": ""
                },
                {
                    "date": "16.12",
                    "mark": "4"
                },
                {
                    "date": "18.12",
                    "mark": ""
                },
                {
                    "date": "20.12",
                    "mark": ""
                },
                {
                    "date": "21.12",
                    "mark": "5"
                },
                {
                    "date": "22.12",
                    "mark": ""
                },
                {
                    "date": "22.12",
                    "mark": ""
                },
                {
                    "date": "23.12",
                    "mark": ""
                },
                {
                    "date": "23.12",
                    "mark": ""
                },
                {
                    "date": "09.01",
                    "mark": ""
                },
                {
                    "date": "09.01",
                    "mark": ""
                },
                {
                    "date": "10.01",
                    "mark": ""
                },
                {
                    "date": "11.01",
                    "mark": ""
                },
                {
                    "date": "13.01",
                    "mark": " 4"
                },
                {
                    "date": "15.01",
                    "mark": ""
                },
                {
                    "date": "15.01",
                    "mark": ""
                },
                {
                    "date": "16.01",
                    "mark": ""
                },
                {
                    "date": "16.01",
                    "mark": ""
                },
                {
                    "date": "16.01",
                    "mark": ""
                },
                {
                    "date": "16.01",
                    "mark": ""
                },
                {
                    "date": "17.01",
                    "mark": ""
                },
                {
                    "date": "17.01",
                    "mark": ""
                },
                {
                    "date": "18.01",
                    "mark": ""
                },
                {
                    "date": "19.01",
                    "mark": ""
                },
                {
                    "date": "20.01",
                    "mark": ""
                },
                {
                    "date": "20.01",
                    "mark": "4"
                },
                {
                    "date": "24.01",
                    "mark": ""
                },
                {
                    "date": "31.01",
                    "mark": ""
                },
                {
                    "date": "08.02",
                    "mark": ""
                },
                {
                    "date": "16.02",
                    "mark": ""
                },
                {
                    "date": "29.02",
                    "mark": ""
                },
                {
                    "date": "05.03",
                    "mark": ""
                },
                {
                    "date": "VII семестр",
                    "mark": " (4.00) 8"
                }
            ]
        },
        
            {
                "subjectName": "Программирование",
                "marks": [
                    {
                        "mark": "",
                        "date": ""
                    },
                    {
                        "date": "01.09",
                        "mark": ""
                    },
                    {
                        "date": "02.09",
                        "mark": ""
                    },
                    {
                        "date": "04.09",
                        "mark": ""
                    },
                    {
                        "date": "04.09",
                        "mark": ""
                    },
                    {
                        "date": "05.09",
                        "mark": ""
                    },
                    {
                        "date": "05.09",
                        "mark": ""
                    },
                    {
                        "date": "06.09",
                        "mark": ""
                    },
                    {
                        "date": "06.09",
                        "mark": ""
                    },
                    {
                        "date": "08.09",
                        "mark": ""
                    },
                    {
                        "date": "08.09",
                        "mark": ""
                    },
                    {
                        "date": "11.09",
                        "mark": ""
                    },
                    {
                        "date": "11.09",
                        "mark": ""
                    },
                    {
                        "date": "12.09",
                        "mark": ""
                    },
                    {
                        "date": "13.09",
                        "mark": ""
                    },
                    {
                        "date": "13.09",
                        "mark": ""
                    },
                    {
                        "date": "14.09",
                        "mark": "Н"
                    },
                    {
                        "date": "15.09",
                        "mark": ""
                    },
                    {
                        "date": "15.09",
                        "mark": ""
                    },
                    {
                        "date": "16.09",
                        "mark": ""
                    },
                    {
                        "date": "16.09",
                        "mark": ""
                    },
                    {
                        "date": "16.09",
                        "mark": ""
                    },
                    {
                        "date": "18.09",
                        "mark": ""
                    },
                    {
                        "date": "19.09",
                        "mark": ""
                    },
                    {
                        "date": "20.09",
                        "mark": ""
                    },
                    {
                        "date": "21.09",
                        "mark": ""
                    },
                    {
                        "date": "22.09",
                        "mark": ""
                    },
                    {
                        "date": "23.09",
                        "mark": "Н"
                    },
                    {
                        "date": "25.09",
                        "mark": ""
                    },
                    {
                        "date": "26.09",
                        "mark": ""
                    },
                    {
                        "date": "27.09",
                        "mark": ""
                    },
                    {
                        "date": "28.09",
                        "mark": "5"
                    },
                    {
                        "date": "29.09",
                        "mark": ""
                    },
                    {
                        "date": "29.09",
                        "mark": ""
                    },
                    {
                        "date": "30.09",
                        "mark": ""
                    },
                    {
                        "date": "02.10",
                        "mark": ""
                    },
                    {
                        "date": "03.10",
                        "mark": ""
                    },
                    {
                        "date": "03.10",
                        "mark": ""
                    },
                    {
                        "date": "03.10",
                        "mark": ""
                    },
                    {
                        "date": "06.10",
                        "mark": ""
                    },
                    {
                        "date": "06.10",
                        "mark": ""
                    },
                    {
                        "date": "06.10",
                        "mark": ""
                    },
                    {
                        "date": "07.10",
                        "mark": "Н"
                    },
                    {
                        "date": "09.10",
                        "mark": ""
                    },
                    {
                        "date": "10.10",
                        "mark": ""
                    },
                    {
                        "date": "11.10",
                        "mark": ""
                    },
                    {
                        "date": "12.10",
                        "mark": ""
                    },
                    {
                        "date": "12.10",
                        "mark": "5"
                    },
                    {
                        "date": "13.10",
                        "mark": ""
                    },
                    {
                        "date": "13.10",
                        "mark": ""
                    },
                    {
                        "date": "14.10",
                        "mark": ""
                    },
                    {
                        "date": "16.10",
                        "mark": ""
                    },
                    {
                        "date": "16.10",
                        "mark": ""
                    },
                    {
                        "date": "17.10",
                        "mark": ""
                    },
                    {
                        "date": "17.10",
                        "mark": ""
                    },
                    {
                        "date": "18.10",
                        "mark": "2"
                    },
                    {
                        "date": "19.10",
                        "mark": ""
                    },
                    {
                        "date": "20.10",
                        "mark": ""
                    },
                    {
                        "date": "20.10",
                        "mark": ""
                    },
                    {
                        "date": "21.10",
                        "mark": "2"
                    },
                    {
                        "date": "23.10",
                        "mark": ""
                    },
                    {
                        "date": "23.10",
                        "mark": ""
                    },
                    {
                        "date": "24.10",
                        "mark": ""
                    },
                    {
                        "date": "25.10",
                        "mark": ""
                    },
                    {
                        "date": "26.10",
                        "mark": ""
                    },
                    {
                        "date": "26.10",
                        "mark": "Н"
                    },
                    {
                        "date": "27.10",
                        "mark": ""
                    },
                    {
                        "date": "27.10",
                        "mark": ""
                    },
                    {
                        "date": "27.10",
                        "mark": ""
                    },
                    {
                        "date": "28.10",
                        "mark": ""
                    },
                    {
                        "date": "28.10",
                        "mark": ""
                    },
                    {
                        "date": "30.10",
                        "mark": ""
                    },
                    {
                        "date": "30.10",
                        "mark": ""
                    },
                    {
                        "date": "31.10",
                        "mark": ""
                    },
                    {
                        "date": "31.10",
                        "mark": ""
                    },
                    {
                        "date": "01.11",
                        "mark": " 4"
                    },
                    {
                        "date": "02.11",
                        "mark": ""
                    },
                    {
                        "date": "03.11",
                        "mark": ""
                    },
                    {
                        "date": "03.11",
                        "mark": ""
                    },
                    {
                        "date": "07.11",
                        "mark": ""
                    },
                    {
                        "date": "08.11",
                        "mark": ""
                    },
                    {
                        "date": "08.11",
                        "mark": ""
                    },
                    {
                        "date": "08.11",
                        "mark": ""
                    },
                    {
                        "date": "09.11",
                        "mark": ""
                    },
                    {
                        "date": "09.11",
                        "mark": "Н"
                    },
                    {
                        "date": "10.11",
                        "mark": ""
                    },
                    {
                        "date": "10.11",
                        "mark": ""
                    },
                    {
                        "date": "10.11",
                        "mark": ""
                    },
                    {
                        "date": "11.11",
                        "mark": ""
                    },
                    {
                        "date": "11.11",
                        "mark": ""
                    },
                    {
                        "date": "13.11",
                        "mark": ""
                    },
                    {
                        "date": "13.11",
                        "mark": ""
                    },
                    {
                        "date": "14.11",
                        "mark": ""
                    },
                    {
                        "date": "16.11",
                        "mark": ""
                    },
                    {
                        "date": "17.11",
                        "mark": ""
                    },
                    {
                        "date": "18.11",
                        "mark": "4"
                    },
                    {
                        "date": "20.11",
                        "mark": ""
                    },
                    {
                        "date": "21.11",
                        "mark": "О"
                    },
                    {
                        "date": "22.11",
                        "mark": ""
                    },
                    {
                        "date": "23.11",
                        "mark": "Н"
                    },
                    {
                        "date": "24.11",
                        "mark": ""
                    },
                    {
                        "date": "24.11",
                        "mark": ""
                    },
                    {
                        "date": "27.11",
                        "mark": ""
                    },
                    {
                        "date": "27.11",
                        "mark": ""
                    },
                    {
                        "date": "28.11",
                        "mark": ""
                    },
                    {
                        "date": "29.11",
                        "mark": ""
                    },
                    {
                        "date": "29.11",
                        "mark": ""
                    },
                    {
                        "date": "30.11",
                        "mark": ""
                    },
                    {
                        "date": "01.12",
                        "mark": ""
                    },
                    {
                        "date": "01.12",
                        "mark": ""
                    },
                    {
                        "date": "01.12",
                        "mark": ""
                    },
                    {
                        "date": "02.12",
                        "mark": ""
                    },
                    {
                        "date": "04.12",
                        "mark": ""
                    },
                    {
                        "date": "05.12",
                        "mark": "5"
                    },
                    {
                        "date": "06.12",
                        "mark": ""
                    },
                    {
                        "date": "06.12",
                        "mark": ""
                    },
                    {
                        "date": "07.12",
                        "mark": ""
                    },
                    {
                        "date": "07.12",
                        "mark": " О"
                    },
                    {
                        "date": "09.12",
                        "mark": ""
                    },
                    {
                        "date": "11.12",
                        "mark": ""
                    },
                    {
                        "date": "11.12",
                        "mark": ""
                    },
                    {
                        "date": "12.12",
                        "mark": ""
                    },
                    {
                        "date": "12.12",
                        "mark": ""
                    },
                    {
                        "date": "13.12",
                        "mark": ""
                    },
                    {
                        "date": "15.12",
                        "mark": ""
                    },
                    {
                        "date": "16.12",
                        "mark": "4"
                    },
                    {
                        "date": "18.12",
                        "mark": ""
                    },
                    {
                        "date": "20.12",
                        "mark": ""
                    },
                    {
                        "date": "21.12",
                        "mark": "5"
                    },
                    {
                        "date": "22.12",
                        "mark": ""
                    },
                    {
                        "date": "22.12",
                        "mark": ""
                    },
                    {
                        "date": "23.12",
                        "mark": ""
                    },
                    {
                        "date": "23.12",
                        "mark": ""
                    },
                    {
                        "date": "09.01",
                        "mark": ""
                    },
                    {
                        "date": "09.01",
                        "mark": ""
                    },
                    {
                        "date": "10.01",
                        "mark": ""
                    },
                    {
                        "date": "11.01",
                        "mark": ""
                    },
                    {
                        "date": "13.01",
                        "mark": " 4"
                    },
                    {
                        "date": "15.01",
                        "mark": ""
                    },
                    {
                        "date": "15.01",
                        "mark": ""
                    },
                    {
                        "date": "16.01",
                        "mark": ""
                    },
                    {
                        "date": "16.01",
                        "mark": ""
                    },
                    {
                        "date": "16.01",
                        "mark": ""
                    },
                    {
                        "date": "16.01",
                        "mark": ""
                    },
                    {
                        "date": "17.01",
                        "mark": ""
                    },
                    {
                        "date": "17.01",
                        "mark": ""
                    },
                    {
                        "date": "18.01",
                        "mark": ""
                    },
                    {
                        "date": "19.01",
                        "mark": ""
                    },
                    {
                        "date": "20.01",
                        "mark": ""
                    },
                    {
                        "date": "20.01",
                        "mark": "4"
                    },
                    {
                        "date": "24.01",
                        "mark": ""
                    },
                    {
                        "date": "31.01",
                        "mark": ""
                    },
                    {
                        "date": "08.02",
                        "mark": ""
                    },
                    {
                        "date": "16.02",
                        "mark": ""
                    },
                    {
                        "date": "29.02",
                        "mark": ""
                    },
                    {
                        "date": "05.03",
                        "mark": ""
                    },
                    {
                        "date": "VII семестр",
                        "mark": " (4.00) 8"
                    }
                ]
            }
        
    ]

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
    }

    async getAllMarksBySubjectId( subjectId){
        return await this.prisma.mark.findMany({
            where:{
                subjectId,
                
            }
        })
    }
}
