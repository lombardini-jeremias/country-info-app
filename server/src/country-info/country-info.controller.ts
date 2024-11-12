import { Controller, Get, Param } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';

@Controller('country')
export class CountryInfoController {
  constructor(private readonly countryService: CountryInfoService) { }

  @Get('available')
  async getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }
}
