import { Test, TestingModule } from '@nestjs/testing';
import { Symbols } from '../Common/Types/symbols';
import { getRateResponseMock } from '../../test/Mocks/getRate';
import { ForexResolver } from './forex.resolver';
import { ForexService } from './forex.service';

describe('ForexResolver', () => {
  let resolver: ForexResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForexResolver,
        {
          provide: ForexService,
          useFactory: () => ({
            getRates: jest.fn((from, to) => getRateResponseMock),
          }),
        },
      ],
    }).compile();

    resolver = module.get<ForexResolver>(ForexResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getRate', () => {
    it('should get exchange rate between currency pairs', async () => {
      expect(
        await resolver.getRates({ from: Symbols.USD, to: [Symbols.SGD] }),
      ).toEqual(getRateResponseMock);
    });
  });
});
