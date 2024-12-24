import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellProperty } from './sell-property.entity';

@Injectable()
export class SellPropertyService {
  constructor(
    @InjectRepository(SellProperty)
    private readonly sellPropertyRepository: Repository<SellProperty>,
  ) {}

  async getApprovedProperties(): Promise<SellProperty[]> {
    return await this.sellPropertyRepository.find({
      where: { isApproved: true, isSold: false },
    });
  }

  async createProperty(propertyData: Partial<SellProperty>): Promise<SellProperty> {
    const property = this.sellPropertyRepository.create(propertyData);
    return await this.sellPropertyRepository.save(property);
  }

  async buyProperty(id: number): Promise<SellProperty> {
    const property = await this.sellPropertyRepository.findOne({ where: { id } });
    if (!property || property.isSold) {
      throw new NotFoundException('Property not found or already sold.');
    }
    property.isSold = true;
    return await this.sellPropertyRepository.save(property);
  }

  async updateProperty(id: number, updateData: Partial<SellProperty>): Promise<SellProperty> {
    const property = await this.sellPropertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found.');
    }
    Object.assign(property, updateData);
    return await this.sellPropertyRepository.save(property);
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await this.sellPropertyRepository.delete(id);
    return result.affected > 0; // Returns true if rows were deleted
  }
}
