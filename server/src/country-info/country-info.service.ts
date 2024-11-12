import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CountryInfoService {
  constructor(private configService: ConfigService) { }

  private nagerBaseUrl = this.configService.get<string>('NAGER_BASE_URL');
  private countriesNowBaseUrl =
    this.configService.get<string>('COUNTRY_NOW_URL');

  async getAvailableCountries() {
    try {
      const response = await axios.get(
        `${this.nagerBaseUrl}/AvailableCountries`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error fetching available countries',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const borderCountriesResponse = await axios.get(
        `${this.nagerBaseUrl}/CountryInfo/${countryCode}`,
      );

      const borderCountries = borderCountriesResponse.data.borders.map(
        (border) => ({
          name: border.commonName,
          code: border.countryCode,
        }),
      );

      const countryName = borderCountriesResponse.data.commonName;

      const populationResponse = await axios.get(
        `${this.countriesNowBaseUrl}/countries/population`,
      );

      const populationData = populationResponse.data.data.find(
        (country) => country.country === countryName,
      );

      const flagResponse = await axios.get(
        `${this.countriesNowBaseUrl}/countries/flag/images`,
      );

      const flagData = flagResponse.data.data.find(
        (countryflag) => countryflag.name === countryName,
      );

      return {
        name: borderCountriesResponse.data.commonName,
        countryCode: borderCountriesResponse.data.countryCode,
        region: borderCountriesResponse.data.region,
        borders: borderCountries,
        populationData: populationData ? populationData.populationCounts : [],
        flagData: flagData ? flagData.flag : [],
      };
    } catch (error) {
      console.error('Error fetching country information:', error);
      throw new HttpException(
        error.response?.data || 'Error fetching country information',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
