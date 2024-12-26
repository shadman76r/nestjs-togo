import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../utils/email.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  // Admin Sign-Up
  async signUp(email: string, password: string): Promise<{ message: string }> {
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    const newAdmin = this.adminRepository.create({ email, password, isVerified: false });
    try {
      await this.adminRepository.save(newAdmin);
      return { message: 'Admin successfully registered. Please log in to verify your account.' };
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw new InternalServerErrorException('An error occurred during admin registration');
    }
  }

  // Admin Login
  async login(email: string, password: string): Promise<{ token: string }> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin || admin.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: admin.email, sub: admin.id };
    const token = this.jwtService.sign(payload);

    // Send verification email
    const verificationLink = 'http://localhost:3001/admin/verify';
    const message = `Hello Admin,\n\nPlease verify your account by clicking the link below:\n\n${verificationLink}\n\nThank you!`;

    await this.emailService.sendEmail(admin.email, 'Admin Verification', message);

    return { token };
  }

  // Admin Verification
  async verifyAdmin(email: string): Promise<{ message: string }> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    admin.isVerified = true;
    await this.adminRepository.save(admin);

    return { message: 'Admin successfully verified' };
  }
}
