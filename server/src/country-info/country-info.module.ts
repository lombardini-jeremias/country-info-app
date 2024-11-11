import { Module } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';
import { CountryInfoController } from './country-info.controller';

@Module({
  controllers: [CountryInfoController],
  providers: [CountryInfoService],
})
export class CountryInfoModule {}
