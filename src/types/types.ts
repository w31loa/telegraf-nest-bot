export interface IAllMarks{
    subjectName: string
    marks: IMark[]
}

export interface IMark{
    date: string
    mark:string
}

export interface ISubject{
    id:number
    title: string
    userId: number
}