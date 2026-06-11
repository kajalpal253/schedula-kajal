import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from 'src/auth/dto/create-availability.dto';
import { CreateOverrideDto } from 'src/auth/dto/create-override.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('availability')
export class AvailabilityController {

    constructor (private readonly availabilityService :AvailabilityService) {}
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Doctor)
    @Post('weekly')
async createAvailability(
  @Req() req,
  @Body() dto: CreateAvailabilityDto,
) {
  const doctorId =
    await this.availabilityService.getDoctorIdByUserId(
      req.user.id,
    );

  return this.availabilityService.createAvailability(
    doctorId,
    dto,
  );
}
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Doctor)
    @Post('override')
    async createOverride(
    @Req() req,
    @Body() dto: CreateOverrideDto,
){
    const doctorId =
      await this.availabilityService.getDoctorIdByUserId(
        req.user.id,
      );

    return this.availabilityService.createOverride(
      doctorId,
      dto,
    );
}    

    @Get(':doctorId')
    getAvailability(
        @Param('doctorId') doctorId:string,
    ){
        return this.availabilityService.getAvailability(
            Number(doctorId),
        );
        
    }
}
