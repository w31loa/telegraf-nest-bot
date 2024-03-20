import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}


    async createUser(user: CreateUserDto){
            const newuser = await this.prisma.user.create({data: user })


            return newuser
    }


    async login(user: CreateUserDto){
        const userExist = await this.prisma.user.findFirst({
            where:{ 
                username : user.username,
                password: user.password
            }
        }) 

        if(!userExist){
            return 'нет такого юзера'
        }


        return userExist
    }

}
