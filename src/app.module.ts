import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './auth/prisma/prisma.service';
import { ProtectedModule } from './protected/protected.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AvailabilityModule } from './availability/availability.module';
import { SlotsModule } from './slots/slots.module';

@Module({
  imports: [AuthModule,ProtectedModule, DoctorModule, PatientModule, AvailabilityModule, SlotsModule],
  providers: [PrismaService],
})
export class AppModule {}

