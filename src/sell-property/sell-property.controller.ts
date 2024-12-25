import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  UseGuards,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SellPropertyService } from './sell-property.service';
import { SellProperty } from './sell-property.entity';

@Controller('sell-property')
export class SellPropertyController {
  constructor(private readonly sellPropertyService: SellPropertyService) {}

  // Public route to get approved and unsold properties
  @Get('public')
  async getPublicProperties() {
    return this.sellPropertyService.getApprovedProperties();
  }

  // Create a new property (authenticated route)
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProperty(@Body() propertyData: Partial<SellProperty>) {
    if (!propertyData.title || !propertyData.price || !propertyData.location) {
      throw new BadRequestException('Missing required fields: title, price, location');
    }
    return this.sellPropertyService.createProperty(propertyData);
  }

  // Update an existing property (authenticated route)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateProperty(@Param('id') id: number, @Body() updateData: Partial<SellProperty>) {
    return this.sellPropertyService.updateProperty(id, updateData);
  }

  // Delete a property (authenticated route)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProperty(@Param('id') id: number) {
    const result = await this.sellPropertyService.deleteProperty(id);
    if (!result) {
      throw new BadRequestException('Property not found or delete failed.');
    }
    return { message: 'Property deleted successfully' };
  }
}
