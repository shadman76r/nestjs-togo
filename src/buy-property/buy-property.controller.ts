import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BuyPropertyService } from './buy-property.service';

@Controller('buy-property')
export class BuyPropertyController {
  constructor(private readonly buyPropertyService: BuyPropertyService) {}

  // Public route: View all unsold properties
  @Get('public')
  async getAllAvailableProperties() {
    return this.buyPropertyService.getAvailableProperties();
  }

  // Secure route: Purchase a property
  @Patch('purchase/:id')
  @UseGuards(JwtAuthGuard)
  async purchaseProperty(@Param('id') id: number, @Request() req: any) {
    const buyer = req.user.username; // Get username from JWT token payload
    return this.buyPropertyService.purchaseProperty(id, buyer);
  }
}
