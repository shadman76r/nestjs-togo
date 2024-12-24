import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellProperty } from './sell-property.entity';
import { SellPropertyController } from './sell-property.controller';
import { SellPropertyService } from './sell-property.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellProperty])],
  controllers: [SellPropertyController],
  providers: [SellPropertyService],
  exports: [SellPropertyService],
})
export class SellPropertyModule {}
