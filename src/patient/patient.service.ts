import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from 'src/auth/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/auth/dto/update-patient.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';


@Injectable()
export class PatientService {
    
     constructor(private prisma:PrismaService) {}
    
       async create(userId: number,dto: CreatePatientDto){
            const existingPatient = await this.prisma.patient.findUnique({
            where:{userId},
        });
        console.log("userid",userId);
        console.log("existingPatient",existingPatient);

        if(existingPatient){
            throw new BadRequestException('Patient profile already exists');
        }
            return this.prisma.patient.create({
                data: {
                    userId,
         fullName: dto.fullName,
         age: dto.age,
        gender: dto.gender,
        contactDetails: dto.contactDetails,
        healthInfo: dto.healthInfo,
        
                },
        });
        }
    
        async findProfile(userId:number ){
            const patient= await this.prisma.patient.findUnique({
            where:{userId},
        });
        if(!patient){
            throw new NotFoundException('Patient profile not found');
        }
        return patient;
        }
    
        async updateProfile(userId:number ,dto:UpdatePatientDto){
             const patient =await this.prisma.patient.findUnique({
            where:{userId},
        });

        if(!patient){
            throw new NotFoundException('Patient profile not found');
        }
            return this.prisma.patient.update({
                where:{userId},
                data:dto,
            });
        }

        async deleteDoctor(id:number){
        const doctor = await this.prisma.patient.findUnique({
            where: { id },
        });
        if(!doctor){
            throw new NotFoundException('Doctor not found');
        }
        return this.prisma.patient.delete({
        where:{id},
        });
    }
    
}
