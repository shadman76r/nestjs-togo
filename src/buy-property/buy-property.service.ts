import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellProperty } from '../sell-property/sell-property.entity';

@Injectable()
export class BuyPropertyService {
  constructor(
    @InjectRepository(SellProperty)
    private readonly sellPropertyRepository: Repository<SellProperty>,
  ) {}

  // Fetch all available properties (not sold)
  async getAvailableProperties(): Promise<SellProperty[]> {
    return await this.sellPropertyRepository.find({ where: { isSold: false } });
  }

  // Fetch all bought properties (sold)
  async getBoughtProperties(): Promise<SellProperty[]> {
    return await this.sellPropertyRepository.find({ where: { isSold: true } });
  }

  // Buy a property
  async buyProperty(id: number, contact: string): Promise<SellProperty> {
    const property = await this.sellPropertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found.');
    }
    if (property.isSold) {
      throw new NotFoundException('Property is already sold.');
    }

    property.isSold = true;
    property.contact = contact; // Ensure the `contact` column is present in the SellProperty entity
    return await this.sellPropertyRepository.save(property);
  }
}
