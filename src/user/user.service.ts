import { Injectable, ConflictException, UnauthorizedException,  NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Signup method
  async signup(
    username: string,
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    // Check for duplicate email or username
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    if (existingUser) {
      const conflictField = existingUser.email === email ? 'Email' : 'Username';
      throw new ConflictException(`${conflictField} already exists.`);
    }

    // Create user
    const user = this.userRepository.create({ username, email, password });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Duplicate entry detected.');
      }
      throw error;
    }

    // Generate token
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    //user.token = token;
    await this.userRepository.save(user);

    return { message: 'Signup successful!', token};
  }

  // Login with password
  async loginWithPassword(
    email: string,
    password: string,
  ): Promise<{ token: string } | { message: string; resetLink: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password !== password) {
      return {
        message: 'Password is incorrect. Would you like to reset it?',
        resetLink: '/user/reset-password',
      };
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    user.token = token;
    await this.userRepository.save(user);

    return { token };
  }

  // Reset password
  async resetPassword(
    email: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.password = newPassword;
    await this.userRepository.save(user);

    return { message: `Password for ${email} has been successfully reset.` };
  }
}