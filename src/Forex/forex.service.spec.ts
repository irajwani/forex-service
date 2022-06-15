import { Test, TestingModule } from '@nestjs/testing';
import { ForexService } from './forex.service';
import { Symbols } from '../Common/Types/symbols';
import { getRateResponseMock } from '../../test/Mocks/getRate';
import { CACHE_MANAGER } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FixerApiService } from '../Common/Modules/FixerApi/fixer-api.service';
import { getLatestFromFixerApiMock } from '../../test/Mocks/getLatestFromFixer';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn().mockReturnValue(JSON.stringify(getRateResponseMock[0])),
  del: jest.fn(),
  reset: jest.fn(),
};

const mockFixerApiService = {
  getLatest: jest.fn().mockReturnValue(getLatestFromFixerApiMock),
};

describe('ForexService', () => {
  let service: ForexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ForexService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: FixerApiService, useValue: mockFixerApiService },
      ],
      exports: [ConfigModule],
    }).compile();

    service = module.get<ForexService>(ForexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRate', () => {
    it('should successfully return a rate between currency pairs', async () => {
      expect(
        await service.getRates({ from: Symbols.USD, to: [Symbols.SGD] }),
      ).toEqual(getRateResponseMock);
    });
  });
});
