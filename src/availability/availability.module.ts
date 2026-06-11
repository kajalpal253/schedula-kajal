

import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { AvailabilityController } from './availability.controller';

@Module({
    providers: [AvailabilityService,PrismaService],
    controllers: [AvailabilityController]
})
export class AvailabilityModule {}
