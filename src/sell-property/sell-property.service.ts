import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellProperty } from './sell-property.entity';

@Injectable()
export class SellPropertyService {
  constructor(
    @InjectRepository(SellProperty)
    private readonly sellPropertyRepository: Repository<SellProperty>,
  ) {}

  async createProperty(propertyData: Partial<SellProperty>): Promise<SellProperty> {
    // Check for duplicate properties
    const existingProperty = await this.sellPropertyRepository.findOne({
      where: {
        title: propertyData.title,
        location: propertyData.location,
        price: propertyData.price,
      },
    });

    if (existingProperty) {
      throw new ConflictException('A property with the same title, location, and price already exists.');
    }

    const property = this.sellPropertyRepository.create(propertyData);
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
    const property = await this.sellPropertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found.');
    }

    const result = await this.sellPropertyRepository.delete(id);
    return result.affected > 0;
  }

  async getApprovedProperties(): Promise<SellProperty[]> {
    return await this.sellPropertyRepository.find({
      where: { isApproved: true, isSold: false },
    });
  }
}
