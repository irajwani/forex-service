import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { Symbols } from '../Common/Types/symbols';
import { getRateResponseMock } from '../../test/Mocks/getRate';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

describe('ForexController', () => {
  let controller: ForexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForexController],
      providers: [
        {
          provide: ForexService,
          useValue: {
            getRates: jest.fn(({ from, to }) => getRateResponseMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ForexController>(ForexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should successfully get rate between currencies', async () => {
    const rate = await controller.getRates({
      from: Symbols.USD,
      to: [Symbols.SGD],
    });
    expect(rate).toStrictEqual(getRateResponseMock);
  });

  it('should throw validation error requesting unique values in "to" prop of body', async () => {
    const rate = await controller.getRates({
      from: Symbols.USD,
      to: [Symbols.SGD, Symbols.SGD],
    });
    expect(rate).toStrictEqual(getRateResponseMock);
  });
});
