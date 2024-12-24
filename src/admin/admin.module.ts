import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtStrategy } from './jwt.strategy';
import { Admin } from './admin.entity';
import { SellProperty } from '../sell-property/sell-property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, SellProperty]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Replace with an environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
})
export class AdminModule {}
