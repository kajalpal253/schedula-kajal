import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from 'src/auth/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/auth/dto/update-doctor.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Injectable()
export class DoctorService {
    constructor(private prisma:PrismaService) {}

    async create(userId: number,dto: CreateDoctorDto){
        const existingDoctor = await this.prisma.doctor.findUnique({
            where:{userId},
        });
        if(existingDoctor){
            throw new BadRequestException('Doctor profile already exists');
        }
         console.log(dto);
        return this.prisma.doctor.create({
            data: {
         userId,
         fullName: dto.fullName,
         specialization: dto.specialization,
        experience: dto.experience,
        qualification: dto.qualification,
        consultationFee: dto.consultationFee,
        availabilityHours: dto.availabilityHours,
        profileDetails: dto.profileDetails,
       
}
    });
    }

     async getProfile(userId:number ){
       const doctor= this.prisma.doctor.findUnique({
            where:{userId},
        });
        if(!doctor){
            throw new NotFoundException('Doctor profile not found');
        }
        return doctor;
    }

    async updateProfile(userId:number ,dto:UpdateDoctorDto){
        const doctor =await this.prisma.doctor.findUnique({
            where:{userId},
        });
        if(!doctor){
            throw new NotFoundException('Doctor profile not found');
        }
        return this.prisma.doctor.update({
            where:{userId},
            data:dto,
        });
    }
}
