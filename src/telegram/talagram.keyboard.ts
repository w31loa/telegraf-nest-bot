import { IMark, ISubject } from "src/types/types"
import { Markup } from "telegraf"
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram"

// const data = [
// 	{
// 		"id": 3,
// 		"title": "Иностранный язык",
// 		"userId": 1
// 	},
// 	{
// 		"id": 4,
// 		"title": "Программирование",
// 		"userId": 1
// 	}
// ]

export const getKeyboardWithSubjects = (data:ISubject[])=>{

    const format = (data:ISubject)=>{
        
        return [{ text: `${data.title}`, callback_data: `subjectId_${data.id}` }]
    }
    
    const markup:unknown = data.map(el=> format(el) )
    
    // [{ text: "hello", callback_data: "hello" }]
    // Markup.inlineKeyboard(markup)
    // console.log(markup)
    return markup as InlineKeyboardButton[][]
}
export const getKeyboardWithMarks = (data:IMark[] , subjectId:number)=>{

    const format = (data:IMark)=>{
        
        return [{ text: data.mark, callback_data: data.date } , { text: data.date, callback_data: data.date }]
    }
	let markup: unknown[] = [[{ text:'💯 Оценка' , callback_data: 'd' } , { text: '📅 Дата', callback_data: ' a'}]]
    
    data.map(el=> markup.push(format(el))  )
    
    // [{ text: "hello", callback_data: "hello" }] 
    // Markup.inlineKeyboard(markup)
	// console.log(markup)
    markup.push([{ text: "📋 Вывести в виде таблицы", callback_data: `table_${subjectId}`}])
    return markup as InlineKeyboardButton[]
}

