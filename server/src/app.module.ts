import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryInfoModule } from './country-info/country-info.module';

@Module({
  imports: [CountryInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
