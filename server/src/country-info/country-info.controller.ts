import { Controller, Get, Param } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';

@Controller('country')
export class CountryInfoController {
  constructor(private readonly countryService: CountryInfoService) { }

  @Get('available')
  async getAvailableCountries() {
    console.log('CONTROLLER LOG');
    return this.countryService.getAvailableCountries();
  }

  @Get(':code')
  async getCountryInfo(@Param('code') code: string) {
    console.log('CONTROLLER LOG');
    return this.countryService.getCountryInfo(code);
  }
}
