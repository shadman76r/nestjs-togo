import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellPropertyModule } from './sell-property/sell-property.module';
import { BuyPropertyModule } from './buy-property/buy-property.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'finaltime',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SellPropertyModule,
    BuyPropertyModule,
    AdminModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
