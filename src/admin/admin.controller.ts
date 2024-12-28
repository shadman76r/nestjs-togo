/*import { Controller, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Admin Signup
  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      return { message: 'Email and password are required.' };
    }
    return this.adminService.signUp(email, password);
  }

  // Admin Login
  @Post('login')
  async login(@Body() body: { email: string; password: string; token: string }) {
    const { email, password, token } = body;
    if (!email || !password || !token) {
      return { message: 'Email, password, and token are required.' };
    }
    return this.adminService.login(email, password, token);
  }

  // Restrict Admin Deletion
  @Delete(':id')
  async deleteAdmin(@Param('id') id: number) {
    return this.adminService.deleteAdmin(id);
  }
}
*/
import { Controller, Post, Body, Delete, Headers, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Admin Signup
  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      return { message: 'Email and password are required.' };
    }
    return this.adminService.signUp(email, password);
  }

  // Admin Login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      return { message: 'Email and password are required.' };
    }
    return this.adminService.login(email, password);
  }

  // Restrict Admin Deletion
  @Delete()
  async deleteAdmin(@Headers('Authorization') authHeader: string) {
    await this.adminService.validateToken(authHeader);
    return this.adminService.deleteAdmin();
  }
}
