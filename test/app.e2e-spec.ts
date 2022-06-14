import * as request from 'supertest';
import { INestApplication, CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ForexService } from '../src/Forex/forex.service';
import { getRateResponseMock } from './Mocks/getRate';
import { AppModule } from '../src/app.module';
import { healthCheckResponseMock } from './Mocks/healthCheck';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

const requestFunction = <T>(url: string, data: T, app: INestApplication) => {
  return request(app.getHttpServer()).get(url).expect(200).expect(data);
};

describe('App (e2e)', () => {
  let app: INestApplication;
  let forexService = {
    getRate: jest.fn(() => getRateResponseMock),
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
      return requestFunction('/health', healthCheckResponseMock, app);
    });
  });

  describe('Forex', () => {
    it(`/GET forex should return expected result`, async () => {
      const expected = forexService.getRate();
      return requestFunction('/forex', expected, app);
    });
  });
});
