import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from 'src/auth/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/auth/dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('doctor')
export class DoctorController {
    constructor (private readonly doctorService :DoctorService) {}

    @Post()
    create(@Req() req, @Body() createDoctorDto: CreateDoctorDto) {
        return this.doctorService.create(req.user.id,createDoctorDto,);
    }

    @Get("profile")
    findone(@Req() req){
     return this.doctorService.getProfile(req.user.id,);
    }

    @Patch("profile")
    update(@Req() req ,@Body() updateDoctorDto:UpdateDoctorDto){
        return this.doctorService.updateProfile(req.user.id,updateDoctorDto)
    }

}
