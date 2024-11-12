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

      return {
        name: borderCountriesResponse.data.commonName,
        countryCode: borderCountriesResponse.data.countryCode,
        region: borderCountriesResponse.data.region,
        borders: borderCountries,
        populationData: populationData ? populationData.populationCounts : [],
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
