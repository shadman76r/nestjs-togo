import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { Bid } from './bid.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  // Add a property for bidding
  async addProperty(propertyData: Partial<Property>, owner: string): Promise<Property> {
    const property = this.propertyRepository.create({
      ...propertyData,
      owner,
      biddingEndsAt: new Date(Date.now() + 60 * 60 * 2000), // 2-hour bidding window
    });
    return this.propertyRepository.save(property);
  }

  // Place a bid on a property
  async placeBid(propertyId: number, bidder: string, amount: number): Promise<Bid> {
    const property = await this.propertyRepository.findOne({ where: { id: propertyId, isAvailableForBidding: true } });
    if (!property) {
      throw new NotFoundException('Property not found or not available for bidding.');
    }

    if (new Date() > property.biddingEndsAt) {
      property.isAvailableForBidding = false;
      await this.propertyRepository.save(property);
      throw new BadRequestException('Bidding has ended for this property.');
    }

    const highestBid = await this.bidRepository.findOne({
      where: { property: { id: propertyId } },
      order: { amount: 'DESC' },
    });

    if (highestBid && amount <= highestBid.amount) {
      throw new BadRequestException('Bid amount must be higher than the current highest bid.');
    }

    const bid = this.bidRepository.create({ property, bidder, amount });
    return this.bidRepository.save(bid);
  }

  // Get all bids for a property
  async getBidsForProperty(propertyId: number): Promise<Bid[]> {
    return this.bidRepository.find({ where: { property: { id: propertyId } }, order: { amount: 'DESC' } });
  }

  // Get the highest bid for a property
  async getHighestBidForProperty(propertyId: number): Promise<Bid | null> {
    const highestBid = await this.bidRepository.findOne({
      where: { property: { id: propertyId } },
      order: { amount: 'DESC' },
    });
    return highestBid || null;
  }

  // Get all properties available for bidding
  async getAvailableProperties(): Promise<Property[]> {
    return this.propertyRepository.find({ where: { isAvailableForBidding: true } });
  }
}