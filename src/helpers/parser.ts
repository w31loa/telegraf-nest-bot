

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
    
        subjectsList.forEach(el=>{
            allMarks[el]=[]
        })
        for(let i = 1 ; i<=subjectsList.length ; i++){
            
            let rowEls = document.querySelector(`#right_${i}`).parentNode.childNodes
            marksList= []
    
            for(let j = 0; j<rowEls.length; j++){
    
                if(rowEls[j].textContent.replace(/\n/g, '').replace(/\s+/g, ' ') != ' '){
                    marksList.push(rowEls[j].textContent)
                }
            }
            for(let k in dateList){
                allMarks[subjectsList[i-1]].push({date:dateList[k] , mark:marksList[k]})
            }
            
    
        }
        return allMarks
    }
    return getMarks(getDateList(), getSubjectsList())
}
 
  



// console.log(getAllMarks(document))