import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryInfoModule } from './country-info/country-info.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountryInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
