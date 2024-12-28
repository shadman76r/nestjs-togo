import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuyProperty } from './buy-property.entity';

@Injectable()
export class BuyPropertyService {
  constructor(
    @InjectRepository(BuyProperty)
    private readonly buyPropertyRepository: Repository<BuyProperty>,
  ) {}

  // Fetch all available properties
  async getAllAvailableProperties(): Promise<BuyProperty[]> {
    return this.buyPropertyRepository.find({
      where: { isSold: false },
    });
  }

  // Buy a property
  async buyProperty(id: number, buyer: string): Promise<BuyProperty> {
    const property = await this.buyPropertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found.');
    }

    if (property.isSold) {
      throw new BadRequestException('Property is already sold.');
    }

    property.isSold = true;
    property.buyer = buyer;
    return this.buyPropertyRepository.save(property);
  }
}
