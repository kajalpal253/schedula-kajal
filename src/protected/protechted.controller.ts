import {Controller,Get,UseGuards,} from  '@nestjs/common';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';


@Controller()
export class ProtectedController {

    @Get('doctor-dashboard')
    @UseGuards(
        JwtAuthGuard,
        RolesGuard,

    )
    @Roles('doctor')
    doctorRoute() {
        return {
            message:'Doctor route accessed',
        };
    }
    @Get('patient')
    @UseGuards(
        JwtAuthGuard,
        RolesGuard,
    )
    @Roles('patient-dashboard')
    patientRoute() {
        return {
            message:'Patient route accessed',
        };
    }
}