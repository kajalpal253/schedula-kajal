import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from 'src/auth/dto/create-availability.dto';
import { CreateOverrideDto } from 'src/auth/dto/create-override.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Injectable()
export class AvailabilityService {
    constructor(private prisma:PrismaService) {}

    async createAvailability (doctorId: number,dto: CreateAvailabilityDto){
       
        if(dto.startTime >= dto.endTime){
            throw new BadRequestException(
                'End time must be greatr than start time'
            );
        }

        const existing =await this.prisma.availability.findFirst({
            where: {
                doctorId,
                dayOfWeek:dto.dayOfWeek,
                startTime:dto.startTime,
                endTime:dto.endTime,
            },
        });
        if(existing){
            throw new BadRequestException('Availability already exists',);
        }
        return this.prisma.availability.create({
            data: {
                doctorId,
                dayOfWeek:dto.dayOfWeek,
                startTime:dto.startTime,
                endTime:dto.endTime,
            },
        });

    }
    async createOverride (doctorId: number,dto: CreateOverrideDto){
        
        return this.prisma.availabilityOverride.create({
            data: {
                doctorId,
                date:new Date(dto.date),
                startTime:dto.startTime,
                endTime:dto.endTime,
            },
        });


    }

    async getAvailability(doctorId: number){
        const recurring =await this.prisma.availability.findMany({
            where:{doctorId},
        })
        const overrides= await this.prisma.availabilityOverride.findMany({
            where: {doctorId},

        });
        return {
            recurring,
            overrides,
        };
    }
    async getDoctorIdByUserId(userId: number) {
  const doctor = await this.prisma.doctor.findUnique({
    where: {
      userId,
    },
  });

  if (!doctor) {
    throw new BadRequestException('Doctor profile not found');
  }

  return doctor.id;
}


    
}
