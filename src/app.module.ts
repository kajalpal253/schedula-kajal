import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './auth/prisma/prisma.service';
import { ProtectedModule } from './protected/protected.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [AuthModule,ProtectedModule, DoctorModule, PatientModule],
  providers: [PrismaService],
})
export class AppModule {}

