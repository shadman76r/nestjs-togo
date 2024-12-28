import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellProperty } from '../sell-property/sell-property.entity';

@Injectable()
export class BuyPropertyService {
  constructor(
    @InjectRepository(SellProperty)
    private readonly sellPropertyRepository: Repository<SellProperty>,
  ) {}

  // Fetch all unsold properties
  async getAvailableProperties(): Promise<SellProperty[]> {
    return this.sellPropertyRepository.find({ where: { isSold: false } });
  }

  // Purchase a property
  async purchaseProperty(id: number, buyer: string): Promise<SellProperty> {
    const property = await this.sellPropertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found.');
    }

    if (property.isSold) {
      throw new BadRequestException('Property is already sold.');
    }

    property.isSold = true;
    //property.buyer = buyer;
    return this.sellPropertyRepository.save(property);
  }
}
