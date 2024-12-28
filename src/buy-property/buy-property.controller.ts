import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BuyPropertyService } from './buy-property.service';

@Controller('buy-property')
export class BuyPropertyController {
  constructor(private readonly buyPropertyService: BuyPropertyService) {}

  // Public route to view all available properties
  @Get('public')
  async getAllAvailableProperties() {
    return this.buyPropertyService.getAllAvailableProperties();
  }

  // Secure route to buy a property
  @Patch('purchase/:id')
  @UseGuards(JwtAuthGuard)
  async buyProperty(@Param('id') id: number, @Request() req: any) {
    const buyer = req.user.username;
    return this.buyPropertyService.buyProperty(id, buyer);
  }
}
