import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Property } from './property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // Add a property for bidding
  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addProperty(@Body() propertyData: Partial<Property>, @Request() req: any) {
    const owner = req.user.username; // Extract user from JWT
    return this.propertyService.addProperty(propertyData, owner);
  }

  // Place a bid on a property
  @Post('bid/:id')
  @UseGuards(JwtAuthGuard)
  async placeBid(
    @Param('id') propertyId: number,
    @Body() body: { amount: number },
    @Request() req: any,
  ) {
    const bidder = req.user.username; // Extract user from JWT
    return this.propertyService.placeBid(propertyId, bidder, body.amount);
  }

  // Get all bids for a property
  @Get('bids/:id')
  async getBids(@Param('id') propertyId: number) {
    return this.propertyService.getBidsForProperty(propertyId);
  }

  // Get the highest bid for a property
  @Get('highest-bid/:id')
  async getHighestBid(@Param('id') propertyId: number) {
    return this.propertyService.getHighestBidForProperty(propertyId);
  }

  // Get all available properties for bidding
  @Get('available')
  async getAvailableProperties() {
    return this.propertyService.getAvailableProperties();
  }
}