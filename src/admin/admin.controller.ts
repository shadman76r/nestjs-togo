import { Controller, Post, Body, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return this.adminService.signUp(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.adminService.login(body.email, body.password);
  }

  @Post('verify')
  async verifyAdmin(@Query('email') email: string) {
    return this.adminService.verifyAdmin(email);
  }
}
