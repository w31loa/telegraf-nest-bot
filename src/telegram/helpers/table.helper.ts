import { IMark } from "src/types/types"

export const  getMarksTable = (marks:IMark[] , subject):string=>{
        
    
    let table = '```'
    table+=`🤓 ${subject}\n|    💯 Оценка    |    📅 Дата    |\n`
    marks.forEach(el=>{
      table+= formatTableRow(el)
    })
    table+='```'

    return table
}

const formatTableRow = (mark:IMark)=>{
    // if(mark.mark.length == 2){
    //   return  `|        ${mark.mark.replace(/\s+/g, '')}        |      ${mark.date}     |\n`
    // }
    // console.log(mark.mark.length)
    if(mark.mark[0] == ' '){
        mark.mark = mark.mark.slice(1)
    }
    if(mark.mark.length > 5){
        console.log(1231231231)
        return  `|_________________|_______________|\n    ${mark.mark}      ${mark.date} \n`
        // |    (3.60) 10    |   VII cеместр | 
  
    }

    if(mark.mark.length > 2){
      return  `|       ${mark.mark}       |      ${mark.date}    |\n`

    }

 

    return  `|        ${mark.mark.replace(/\s+/g, '')}        |      ${mark.date}    |\n`
}