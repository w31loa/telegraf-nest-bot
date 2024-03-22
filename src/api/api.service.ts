import { Injectable, Logger } from '@nestjs/common';
import { Observable, catchError, map , of} from 'rxjs';
import * as qs from 'qs'
import {JSDOM} from 'jsdom'
import {getAllMarks} from '../helpers/parser'
import { HttpService } from '@nestjs/axios';
import { IAllMarks } from 'src/types/types';
import { coder } from 'src/helpers/coder';


interface loginData  {
    username:string,
    userpass:string
}


@Injectable()
export class ApiService {
    private readonly logger = new Logger(ApiService.name)
    private loginUrl
    private marksUrl

    constructor(private readonly htppService: HttpService){
        this.loginUrl = 'https://journal.uc.osu.ru/region_pou_secured/region.cgi/login'
        this.marksUrl = 'https://journal.uc.osu.ru/region_pou_secured/region.cgi/journal_och?page=1&marks=1&wide=1'
    }

    test(){
        return this.htppService.axiosRef.get('https://stackoverflow.com/questions/69139950/how-to-use-axios-httpservice-from-nest-js-to-make-a-post-request').then(data=>{
            return data.data
        })
    }

    async generateResponse(loginData:loginData):Promise<IAllMarks[]>{

        const options = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }   
        console.log(loginData)
        const  data= qs.stringify({'username': loginData.username , 'userpass': coder(loginData.userpass)})
        // const  data= qs.stringify({'username': 'BARANNIKAP' , 'userpass': coder('6TwDEcO8Ac')})
      
        const marks = await  this.htppService.axiosRef.post(this.loginUrl, data, options)
            .then((res)=>res.headers['set-cookie'])
            .then(cookieArr=> {
                console.log(123)
          
                let cookieStr = ''
                cookieArr.forEach(el => {
                
                    cookieStr+=el.split(';')[0]+'; '
                });
                return cookieStr
            })
            .then(cookieStr => {
                return fetch(this.marksUrl, {
                    method: 'GET',
                    headers: {
                        'Cookie': `${cookieStr}`   ,
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br'
                    }
                })
                .then(data=>{
                    let html = ''
                    const readableStream = data.body
                    const reader = readableStream.getReader();
                    const decoder = new TextDecoder('windows-1251');
                    function readStream() {
                        return reader.read().then(({ done, value }) => {
                          if (done) {
                            return html
                            
                          }
                          html += decoder.decode(value, { stream: true });
                          return readStream();
                        });
                      }
                     return  readStream().then(html=>{
                         const dom = new JSDOM(html)
                        //  console.log(html)
                         const document = dom.window.document
                         

                                return  getAllMarks(document) 
                            
        
                         
                           
                         
                      })
                      
                })
            })
            .then(data=> {
                return data
            }).catch(e=>{
                return e
            })
            // console.log(marks)
            return marks
        
        }
} 


