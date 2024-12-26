import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { EmailService } from '../utils/email.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, EmailService],
})
export class AdminModule {}
