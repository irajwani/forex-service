import * as request from 'supertest';
import { INestApplication, CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ForexService } from '../src/Forex/forex.service';
import { getRateResponseMock } from './Mocks/getRate';
import { AppModule } from '../src/app.module';
import { healthCheckResponseMock } from './Mocks/healthCheck';
import { Symbols } from '../src/Common/Types/symbols';
import { GetRateArgs } from '../src/Forex/Args/get-rate.args';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

const requestFunction = <T>(
  url: string,
  body: GetRateArgs,
  expectedData: T,
  app: INestApplication,
) => {
  return request(app.getHttpServer())
    .post(url)
    .send(body)
    .expect(200)
    .expect(expectedData);
};

describe('App (e2e)', () => {
  let app: INestApplication;
  let forexService = {
    getRates: jest.fn(({ from, to }) => getRateResponseMock),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: [{ provide: CACHE_MANAGER, useValue: mockCacheManager }],
    })
      .overrideProvider(ForexService)
      .useValue(forexService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health', () => {
    it('should say app is healthy', async () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect(healthCheckResponseMock);
    });
  });

  describe('Forex', () => {
    it(`/POST forex should return expected result`, async () => {
      const body = {
        from: Symbols.USD,
        to: [Symbols.SGD],
      };
      const expected = forexService.getRates(body);
      return requestFunction('/forex', body, expected, app);
    });
  });
});
