import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService,PrismaService]
})
export class SlotsModule {}
