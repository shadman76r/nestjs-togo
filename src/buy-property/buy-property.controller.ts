import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BuyPropertyService } from './buy-property.service';

@Controller('buy-property')
@UseGuards(JwtAuthGuard) // Protect all routes
export class BuyPropertyController {
  constructor(private readonly buyPropertyService: BuyPropertyService) {}

  // Get all available properties
  @Get('available')
  async getAvailableProperties() {
    return this.buyPropertyService.getAvailableProperties();
  }

  // Get all bought properties
  @Get('bought')
  async getBoughtProperties() {
    return this.buyPropertyService.getBoughtProperties();
  }

  // Buy a property
  @Post('buy/:id')
  async buyProperty(@Param('id') id: number, @Body() body: { contact: string }) {
    return this.buyPropertyService.buyProperty(id, body.contact);
  }
}
