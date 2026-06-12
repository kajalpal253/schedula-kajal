import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from 'src/auth/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/auth/dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('doctor')
export class DoctorController {
    constructor (private readonly doctorService :DoctorService) {}
     
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Doctor)
    @Post()
    create(@Req() req, @Body() createDoctorDto: CreateDoctorDto) {
        return this.doctorService.create(req.user.id,createDoctorDto,);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Doctor)  
   @Get("profile")
    findone(@Req() req){
     return this.doctorService.getProfile(req.user.id,);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
     @Roles(Role.Doctor)
    @Patch("profile")
    update(@Req() req ,@Body() updateDoctorDto:UpdateDoctorDto){
        return this.doctorService.updateProfile(req.user.id,updateDoctorDto)
    }

    @Get()
    getDoctors(
        @Query('page') page=1,
        @Query('limit') limit=10,
        @Query('specialization') specialization?:string,
        @Query('search') search?: string,
    )
    {
        return this.doctorService.getDoctors(
            Number(page),
            Number(limit),
            specialization,
            search,
        );
    }

    @Get(':id')
    getDoctorById(@Param('id') id:string){
        return this.doctorService.getDoctorById(Number(id));
    }
    
    @UseGuards(JwtAuthGuard,RolesGuard)
     @Roles(Role.Doctor)
    @Delete(':id')
    deletetDoctor(@Param('id') id:string){
        return this.doctorService.deleteDoctor(Number(id));
    }


}
