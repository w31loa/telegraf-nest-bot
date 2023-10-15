import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, catchError, map , of} from 'rxjs';
import * as qs from 'qs'
import {JSDOM} from 'jsdom'
import {getAllMarks} from '../helpers/parser'


interface loginData  {
    username:string,
    userpass:string
}


@Injectable()
export class MarksService {
    private readonly logger = new Logger(MarksService.name)
    private loginUrl
    private marksUrl

    constructor(private readonly htppService: HttpService){
        this.loginUrl = 'https://journal.uc.osu.ru/region_pou_secured/region.cgi/login'
        this.marksUrl = 'https://journal.uc.osu.ru/region_pou_secured/region.cgi/journal_och?page=1&marks=1'
    }

    test(){
        return this.htppService.axiosRef.get('https://stackoverflow.com/questions/69139950/how-to-use-axios-httpservice-from-nest-js-to-make-a-post-request').then(data=>{
            return data.data
        })
    }

    async generateResponse(loginData:loginData):Promise<any>{

        const options = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
        const  data= qs.stringify({'username': "BARANNIKAP" , 'userpass': `1dbf71922928df9ce9e0e8303bb2c84f02184f8e`})
      
        const marks = await  this.htppService.axiosRef.post(this.loginUrl, data, options)
            .then((res)=>res.headers['set-cookie'])
            .then(cookieArr=> {
                let cookieStr = ''
                cookieArr.forEach(el => {
                
                    cookieStr+=el.split(';')[0]+'; '
                });
                return cookieStr
            })
            .then(cookieStr => {
                return fetch('https://journal.uc.osu.ru/region_pou_secured/region.cgi/journal_och?page=1&marks=1', {
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
                            // console.log(html)
                            const dom = new JSDOM(html)
                            const document = dom.window.document
                            
                            if(document.querySelector('tbody')){
                            return getAllMarks(document) 
                            // console.log(data['Иностранный язык'])
                            
        
                            }else{
                                throw new Error('Введены неправильные данные или сервак лёг)')
                            }
                            
                           
                         
                      })
                      
                })
            })
            .then(data=> {
                return data
            })
            return marks
        
        }
}


