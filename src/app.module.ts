import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './auth/prisma/prisma.service';
import { ProtectedModule } from './protected/protected.module';

@Module({
  imports: [AuthModule,ProtectedModule],
  providers: [PrismaService],
})
export class AppModule {}
