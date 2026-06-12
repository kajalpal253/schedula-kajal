import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from 'src/auth/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/auth/dto/update-patient.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
    constructor (private readonly patientService :PatientService) {}
    
        @Post()
        create(@Req() req, @Body() createPatientDto: CreatePatientDto) {
            return this.patientService.create(req.user.id,createPatientDto,);
        }
    
        @Get("profile")
        findone(@Req() req){
         return this.patientService.findProfile(req.user.id,);
        }
    
        @Patch("profile")
        update(@Req() req ,@Body() updatePatientDto:UpdatePatientDto){
            return this.patientService.updateProfile(req.user.id,updatePatientDto)
        }

        @Delete(':id')
            deletetPatint(@Param('id') id:string){
                return this.patientService.deleteDoctor(Number(id));
            }
}
