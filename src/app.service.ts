import { Injectable } from '@nestjs/common';
import { ApiService } from './api/api.service';

@Injectable()
export class AppService {

  constructor(private readonly mark :ApiService){}

  async getHello() {

    const marks = await this.mark.generateResponse({'username': "BARANNIKAP" , 'userpass': `1dbf71922928df9ce9e0e8303bb2c84f02184f8e`});

    const mestt = marks.filter(el=> el.subjectName == 'Иностранный язык')

    return mestt;
  }
}
