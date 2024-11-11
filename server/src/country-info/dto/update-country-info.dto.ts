import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryInfoDto } from './create-country-info.dto';

export class UpdateCountryInfoDto extends PartialType(CreateCountryInfoDto) {}
