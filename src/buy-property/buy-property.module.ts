import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyProperty } from './buy-property.entity';
import { BuyPropertyController } from './buy-property.controller';
import { BuyPropertyService } from './buy-property.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyProperty]),
    AuthModule,
  ],
  controllers: [BuyPropertyController],
  providers: [BuyPropertyService],
})
export class BuyPropertyModule {}
