/*import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // Admin Signup
  async signUp(email: string, password: string): Promise<{ message: string; token: string }> {
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists.');
    }

    const newAdmin = this.adminRepository.create({ email, password });
    await this.adminRepository.save(newAdmin);

    // Generate token
    const token = this.jwtService.sign({ sub: newAdmin.id, email: newAdmin.email });
    newAdmin.token = token;
    await this.adminRepository.save(newAdmin);

    return { message: 'Signup successful!', token };
  }

  // Admin Login
  async login(email: string, password: string, token: string): Promise<{ message: string; token: string }> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin || admin.password !== password) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Validate token
    if (admin.token !== token) {
      throw new ForbiddenException('Invalid token. Login not allowed.');
    }

    return { message: 'Login successful!', token: admin.token };
  }

  // Delete Admin (Restricted)
  async deleteAdmin(adminId: number): Promise<void> {
    throw new ForbiddenException('Admin deletion is not allowed.');
  }
}*/

import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // Admin Signup
  async signUp(email: string, password: string): Promise<{ message: string; token: string }> {
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists.');
    }

    const newAdmin = this.adminRepository.create({ email, password });
    await this.adminRepository.save(newAdmin);

    // Generate token
    const token = this.jwtService.sign({ sub: newAdmin.id, email: newAdmin.email });
    newAdmin.token = token;
    await this.adminRepository.save(newAdmin);

    return { message: 'Signup successful!', token };
  }

  // Admin Login
  async login(email: string, password: string): Promise<{ message: string; token: string }> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin || admin.password !== password) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Return token on successful login
    return { message: 'Login successful!', token: admin.token };
  }

  // Validate Token from Authorization Header
  async validateToken(authHeader: string): Promise<void> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is missing or invalid.');
    }

    const token = authHeader.split(' ')[1];
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired.');
    }
  }

  // Delete Admin (Restricted)
  async deleteAdmin(): Promise<void> {
    throw new ForbiddenException('Admin deletion is not allowed.');
  }
}

