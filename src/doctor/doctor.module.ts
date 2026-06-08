import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Module({
  providers: [DoctorService,PrismaService],
  controllers: [DoctorController]
})
export class DoctorModule {}
