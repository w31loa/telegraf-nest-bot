import { IAllMarks } from './../types/types';


export function getAllMarks(document){
    function getSubjectsList(){
        const subjectsTableEl = document.querySelector('tbody').children
        const subjectsList = []
        for(let i = 1 ; i<subjectsTableEl.length ; i++){
            subjectsList.push(subjectsTableEl[i].children[0].textContent.replace(/\n/g, '').replace(/\s+/g, ' '))
        
        }
        return subjectsList
    }
    
     function getDateList(){
        const dateRow = document.querySelector('#right_0').parentNode
        const dateEls = dateRow.childNodes
        let dateList = []
        dateEls.forEach(el=>{
            if(el.textContent.replace(/\n/g, '').replace(/\s+/g, ' ') != ' '){
                dateList.push(el.textContent)
            }
        })
    
        return dateList
    }

     function getMarks(dateList, subjectsList){
        let marksList = []
        let allMarks = {}
        let allMarks2: IAllMarks[] = [] 
    
        subjectsList.forEach(el=>{
            allMarks[el]=[]
            allMarks2.push({subjectName: '', marks: [{mark: '' , date: ''}]})
        })
        for(let i = 1 ; i<=subjectsList.length ; i++){
            allMarks2[i-1].subjectName= subjectsList[i-1]
            
            let rowEls = document.querySelector(`#right_${i}`).parentNode.childNodes
            marksList= []
    
            for(let j = 0; j<rowEls.length; j++){
    
                if(rowEls[j].textContent.replace(/\n/g, '').replace(/\s+/g, ' ') != ' '){
                    marksList.push(rowEls[j].textContent)
                }
            }
            // for(let k in dateList){
            //     allMarks[subjectsList[i-1]].push({date:dateList[k] , mark:marksList[k]})
            // }
            for(let k in dateList){
                allMarks2[i-1].marks.push({date:dateList[k] , mark:marksList[k]})
            }
            
            
        }
        // console.log(allMarks2)
        return allMarks2
    }
    // console.log(getMarks(getDateList(), getSubjectsList()))
    return getMarks(getDateList(), getSubjectsList())
    // return 
} 
 
  



// console.log(getAllMarks(document))

// const  mokDate = 
//     [
//         "01.09",
//         "02.09",
//         "04.09",
//         "04.09",
//         "05.09",
//         "05.09",
//         "06.09",
//         "06.09",
//         "08.09",
//         "08.09",
//         "11.09",
//         "11.09",
//         "12.09",
//         "13.09",
//         "13.09",
//         "14.09",
//         "15.09",
//         "15.09",
//         "16.09",
//         "16.09",
//         "16.09",
//         "18.09",
//         "19.09",
//         "20.09",
//         "21.09",
//         "22.09",
//         "23.09",
//         "25.09",
//         "26.09",
//         "27.09",
//         "28.09",
//         "29.09",
//         "29.09",
//         "30.09",
//         "02.10",
//         "03.10",
//         "03.10",
//         "03.10",
//         "06.10",
//         "06.10",
//         "06.10",
//         "07.10",
//         "09.10",
//         "10.10",
//         "11.10",
//         "12.10",
//         "12.10",
//         "13.10",
//         "13.10",
//         "14.10",
//         "16.10",
//         "16.10",
//         "17.10",
//         "17.10",
//         "18.10",
//         "19.10",
//         "20.10",
//         "20.10",
//         "21.10",
//         "23.10",
//         "23.10",
//         "24.10",
//         "25.10",
//         "26.10",
//         "26.10",
//         "27.10",
//         "27.10",
//         "27.10",
//         "28.10",
//         "28.10",
//         "30.10",
//         "30.10",
//         "31.10",
//         "31.10",
//         "01.11",
//         "02.11",
//         "03.11",
//         "03.11",
//         "07.11",
//         "08.11",
//         "08.11",
//         "08.11",
//         "09.11",
//         "09.11",
//         "10.11",
//         "10.11",
//         "10.11",
//         "11.11",
//         "11.11",
//         "13.11",
//         "13.11",
//         "14.11",
//         "16.11",
//         "17.11",
//         "18.11",
//         "20.11",
//         "21.11",
//         "22.11",
//         "23.11",
//         "24.11",
//         "24.11",
//         "27.11",
//         "27.11",
//         "28.11",
//         "29.11",
//         "29.11",
//         "30.11",
//         "01.12",
//         "01.12",
//         "01.12",
//         "02.12",
//         "04.12",
//         "05.12",
//         "06.12",
//         "06.12",
//         "07.12",
//         "07.12",
//         "09.12",
//         "11.12",
//         "11.12",
//         "12.12",
//         "12.12",
//         "13.12",
//         "15.12",
//         "16.12",
//         "18.12",
//         "20.12",
//         "21.12",
//         "22.12",
//         "22.12",
//         "23.12",
//         "23.12",
//         "09.01",
//         "09.01",
//         "10.01",
//         "11.01",
//         "13.01",
//         "15.01",
//         "15.01",
//         "16.01",
//         "16.01",
//         "16.01",
//         "16.01",
//         "17.01",
//         "17.01",
//         "18.01",
//         "19.01",
//         "20.01",
//         "20.01",
//         "24.01",
//         "31.01",
//         "08.02",
//         "16.02",
//         "29.02",
//         "05.03",
//         "VII семестр"
//     ]

// const mokSubj = [
// 	"Иностранный язык",
// 	"Физическая культура",
// 	"Правовое обеспечение профессиональной деятельности",
// 	"Математические методы",
// 	"Основы web-программирования",
// 	"МДК 03.02 Инструментальные средства разработки программного обеспечения",
// 	"МДК.03.03 Документирование и сертификация",
// 	"Информационная безопасность",
// 	"Математические методы (курсовой проект)",
// 	"ПП.03.02 Производственная практика"
// ]
