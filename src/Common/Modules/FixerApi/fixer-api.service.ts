import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { HttpService } from 'nestjs-http-promise';
import { InternalServerException } from 'src/Common/Errors';
import { IGetRatesData } from './Types/fixer-api-responses';

@Injectable()
export class FixerApiService {
  constructor(
    readonly httpService: HttpService,
    readonly configService: ConfigService,
  ) {}

  public async getLatest(fromCurrency, toCurrency): Promise<IGetRatesData> {
    const url: string = `latest?symbols=${toCurrency}&base=${fromCurrency}`;
    try {
      const { data }: AxiosResponse = await this.httpService.get(url);
      return data;
    } catch (err) {
      throw new InternalServerException();
    }
  }
}
