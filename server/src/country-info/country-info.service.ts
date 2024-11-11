import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountryInfoService {
  private nagerBaseUrl = 'https://date.nager.at/api/v3';
  private countriesNowBaseUrl = 'https://countriesnow.space/api/v0.1';

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
      // Fetch BOrder
      const borderCountries = await axios.get(
        `${this.nagerBaseUrl}/CountryInfo/${countryCode}`,
      );

      // Fetch population
      const populationResponse = await axios.post(
        `${this.countriesNowBaseUrl}/countries/population`,
        {
          country: countryCode,
        },
      );

      // Fetch FLAG
      const flagResponse = await axios.post(
        `${this.countriesNowBaseUrl}/countries/flag/images`,
        {
          country: countryCode,
        },
      );

      return {
        borders: borderCountries.data.borders || [],
        populationData: populationResponse.data.data.populationCounts || [],
        flagUrl: flagResponse.data.data.flag || '',
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error fetching country information',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
