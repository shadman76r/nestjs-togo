import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SellPropertyService } from './sell-property.service';
import { SellProperty } from './sell-property.entity';

@Controller('sell-property')
export class SellPropertyController {
  constructor(private readonly sellPropertyService: SellPropertyService) {}

  @Get('public')
  @UseGuards(JwtAuthGuard)
  async getPublicProperties() {
    return this.sellPropertyService.getApprovedProperties();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProperty(@Body() propertyData: Partial<SellProperty>) {
    if (!propertyData.title || !propertyData.price || !propertyData.location) {
      throw new BadRequestException('Missing required fields: title, price, location');
    }
    return this.sellPropertyService.createProperty(propertyData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateProperty(@Param('id') id: number, @Body() updateData: Partial<SellProperty>) {
    return this.sellPropertyService.updateProperty(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProperty(@Param('id') id: number) {
    return this.sellPropertyService.deleteProperty(id);
  }
}
