import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entity';
import { SellProperty } from '../sell-property/sell-property.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(SellProperty)
    private sellPropertyRepository: Repository<SellProperty>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(username: string, password: string): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({ username, password: hashedPassword });
    return await this.adminRepository.save(admin);
  }

  async validateAdmin(username: string, password: string): Promise<{ token: string }> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: admin.username, sub: admin.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async getPendingProperties(): Promise<SellProperty[]> {
    return await this.sellPropertyRepository.find({ where: { isApproved: false } });
  }

  async approveProperty(id: number): Promise<{ message: string }> {
    const property = await this.sellPropertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new Error(`Property with ID ${id} not found`);
    }

    if (property.isApproved) {
      return { message: `Property with ID ${id} is already approved` };
    }

    property.isApproved = true;
    await this.sellPropertyRepository.save(property);

    return { message: `Property with ID ${id} approved successfully` };
  }
}
