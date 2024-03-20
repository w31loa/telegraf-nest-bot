import { ISubject } from "src/types/types"
import { Markup } from "telegraf"
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram"

const data = [
	{
		"id": 1,
		"title": "Иностранный язык",
		"userId": 1
	},
	{
		"id": 2,
		"title": "Программирование",
		"userId": 1
	}
]

export const getKeyboardWithSubjects = (data:ISubject[])=>{

    const format = (data:ISubject)=>{
        
        return { text: data.title, callback_data: data.id }
    }
    
    const markup:unknown = data.map(el=> format(el) )
    
    // [{ text: "hello", callback_data: "hello" }]
    // Markup.inlineKeyboard(markup)
    return markup as InlineKeyboardButton[]
}

