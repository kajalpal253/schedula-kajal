import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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
    createAvailability(
        @Req() req,
        @Body() dto:CreateAvailabilityDto,
    ) {
        return this.availabilityService.createAvailability(
            req.user.id,
            dto,
        );
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Doctor)
    @Post('override')
    createOverride(
        @Req() req,
        @Body() dto:CreateOverrideDto,
    ){
        return this.availabilityService.createOverride(
            req.user.id,
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
