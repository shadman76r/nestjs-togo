import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Bid } from './bid.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Bid]), AuthModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}