import * as request from 'supertest';
import { INestApplication, CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import ConfigurationModule from '../src/Configurations/Config/config.module';
import { FixerApiModule } from '../src/Common/Modules/FixerApi/fixer-api.module';
import { ForexService } from '../src/Forex/forex.service';
import { ForexModule } from '../src/Forex/forex.module';
import { HealthModule } from '../src/Health/health.module';
import { getRateRequestMock, getRateResponseMock } from './Mocks/getRate';
import { AppModule } from '../src/app.module';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
};

const requestFunction = (url: string, data: string, app: INestApplication) => {
  return request(app.getHttpServer()).get(url).expect(200).expect(data);
};

describe('App (e2e)', () => {
  let app: INestApplication;
  let forexService = {
    getRate: (from, to) => getRateResponseMock,
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
        .expect({ status: 'ok', info: {}, error: {}, details: {} });
    });
  });

  describe('Forex', () => {
    it(`/GET forex should return expected result`, async () => {
      return request(app.getHttpServer())
        .get('/forex')
        .expect(200)
        .expect(
          forexService.getRate(getRateRequestMock.from, getRateRequestMock.to),
        );
    });
  });
});
