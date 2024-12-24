import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async createAdmin(@Body() credentials: { username: string; password: string }) {
    return this.adminService.createAdmin(credentials.username, credentials.password);
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    return this.adminService.validateAdmin(credentials.username, credentials.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending-properties')
  async getPendingProperties() {
    return this.adminService.getPendingProperties();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('approve/:id')
  async approveProperty(@Param('id') id: number) {
    return this.adminService.approveProperty(id);
  }
}
