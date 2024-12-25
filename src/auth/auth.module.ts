import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}
