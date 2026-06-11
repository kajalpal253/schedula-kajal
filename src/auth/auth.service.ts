import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma:PrismaService,

    ){}

    async signup(body: any){
        const {name,email,password ,role}=
        body;

        const existingUser =
        await this.prisma.user.findUnique({
            where:{email},
        });

        if(existingUser){
            return {
                message :"User already exists",
            };
        }

        const hashedPassword =
         await bcrypt.hash(password,10);

         const user=await this.prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role,
            },
         });
         return user;
    }

    async login(body:any) {
        const {email ,password} =body;

        const user = 
        await this.prisma.user.findUnique({
            where: {email},
        });

        if(!user){
            return {
                message :"User not found",
            };
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return{
                message :'Invalid credentials',
            };
        }

        const token =jwt.sign(
          {  id: user.id,
            role:user.role,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn:'1d',
          },
        );
        return {token};

    } 
}
