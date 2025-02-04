import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellProperty } from '../sell-property/sell-property.entity';
import { BuyPropertyController } from './buy-property.controller';
import { BuyPropertyService } from './buy-property.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellProperty]), // Register SellProperty entity
    AuthModule, // Import AuthModule for JWT authentication
  ],
  controllers: [BuyPropertyController],
  providers: [BuyPropertyService],
})
export class BuyPropertyModule {}
