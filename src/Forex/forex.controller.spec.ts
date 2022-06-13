import { CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FixerApiModule } from '../Common/Modules/FixerApi/fixer-api.module';
import { FixerApiService } from '../Common/Modules/FixerApi/fixer-api.service';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

describe('Forex Controller', () => {
  let forexController: ForexController;
  let forexService: ForexService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        ForexService,
        FixerApiService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    forexController = moduleRef.get<ForexController>(ForexController);
    forexService = moduleRef.get<ForexService>(ForexService);
  });

  it('should be defined', () => {
    expect(forexController).toBeDefined();
  });
});
