import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Injectable()
export class SlotsService {
    constructor (private prisma:PrismaService){}

    async getSlots(doctorId:number,date:string){
        const doctor=await this.prisma.doctor.findUnique({
            where:{id:doctorId},
        });
        if(!doctor){
            throw new NotFoundException('Doctor not found',);
        }

        const selectedDate =new Date(date);
        if(isNaN(selectedDate.getTime())){
            throw new BadRequestException('Invalid date',);
        }
        const today =new Date();
        today.setHours(0,0,0,0);
        if(selectedDate <today){
          throw  new BadRequestException('Past date not allowed');
        }

        let startTime:string;
        let endTime:string;

        const override = await this.prisma.availabilityOverride.findFirst({
            where:{
                doctorId,
                date:selectedDate,
            },
        })

        

        if(override){
            startTime=override.startTime;
            endTime=override.endTime;
        }else{
            const dayOfWeek=selectedDate.getDay();
            const availability=await this.prisma.availability.findFirst({
                where:{
                    doctorId,
                    dayOfWeek,
                },
            });
            if(!availability){
                throw new NotFoundException('No availability found',);
            }
            startTime =availability.startTime;
            endTime=availability.endTime;
        }
        const slots =this.generateSlots(startTime,endTime,15,selectedDate,);
        if(slots.length===0){
          throw new NotFoundException('No slots available',);
        }
        return {
            doctorId,
            date,
            slots,
        }
    }

    private generateSlots(
    startTime: string,
    endTime: string,
    duration: number,
    selectedDate:Date,
  ) {
    if(duration <=0){
      throw new BadRequestException('Invalid duration',);
    }
    const slots:string[] = [];

    let [hour, minute] =
      startTime.split(':').map(Number);

    const [endHour, endMinute] =
      endTime.split(':').map(Number);

      const now  =new Date();

    while (
      hour < endHour ||
      (hour === endHour &&
        minute < endMinute)
    ) {
      const  slotTime = 
        `${String(hour).padStart(2, '0')}:${String(
          minute,
        ).padStart(2, '0')}`;
      
const slotDateTime = new Date(selectedDate,);
slotDateTime.setHours(hour,minute,0,0);
   if(slotDateTime>now){
    slots.push(slotTime)
   } 
      minute += duration;

      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute %= 60;
      }
    }

    return slots;
  }
}
