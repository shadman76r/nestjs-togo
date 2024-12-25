import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellProperty } from './sell-property.entity';
import { SellPropertyController } from './sell-property.controller';
import { SellPropertyService } from './sell-property.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellProperty]),
    AuthModule, // Import AuthModule to make JwtService available
  ],
  controllers: [SellPropertyController],
  providers: [SellPropertyService],
})
export class SellPropertyModule {}
