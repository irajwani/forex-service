import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { HttpService } from 'nestjs-http-promise';
import { InternalServerException } from 'src/Common/Errors';
import { IGetRatesData } from './Types/fixer-api-responses';
import { Symbols } from '../../Types/symbols';

@Injectable()
export class FixerApiService {
  constructor(
    readonly httpService: HttpService,
    readonly configService: ConfigService,
  ) {}

  public async getLatest(
    baseSymbol: Symbols,
    toSymbols: Symbols[],
  ): Promise<IGetRatesData> {
    const symbols: string = toSymbols.join(',');
    const url: string = `latest?symbols=${symbols}&base=${baseSymbol}`;
    try {
      const { data }: AxiosResponse = await this.httpService.get(url);
      return data;
    } catch (err) {
      throw new InternalServerException();
    }
  }
}
