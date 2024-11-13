import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryInfoModule } from './country-info/country-info.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CLOUD_URL),
    UsersModule,
    CountryInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
