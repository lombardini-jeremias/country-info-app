import { Test, TestingModule } from '@nestjs/testing';
import { CountryInfoController } from './country-info.controller';
import { CountryInfoService } from './country-info.service';

describe('CountryInfoController', () => {
  let controller: CountryInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryInfoController],
      providers: [CountryInfoService],
    }).compile();

    controller = module.get<CountryInfoController>(CountryInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
