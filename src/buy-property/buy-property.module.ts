import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyPropertyController } from './buy-property.controller';
import { BuyPropertyService } from './buy-property.service';
import { SellProperty } from '../sell-property/sell-property.entity';
import { BuyProperty } from './buy-property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellProperty, BuyProperty]), // Include both entities
  ],
  controllers: [BuyPropertyController],
  providers: [BuyPropertyService],
})
export class BuyPropertyModule {}
