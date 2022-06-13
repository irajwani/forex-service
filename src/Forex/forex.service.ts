import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as Promise from 'bluebird';
import { FixerApiService } from '../Common/Modules/FixerApi/fixer-api.service';
import constants from '../Common/constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Symbols } from 'src/Common/Types/symbols';
import { Rate } from './Models/rate';
import { GetRateArgs } from './Args/get-rate.args';
import { TCurrencyPair } from 'src/Common/Types/rates';

@Injectable()
export class ForexService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly fixerApi: FixerApiService,
  ) {}

  public async getRate(args: GetRateArgs): Promise<Rate> {
    const { from, to } = args;
    const currencyPair: string = `${from}-${to}`;
    const cachedRate: Rate = JSON.parse(await this.cache.get(currencyPair));
    if (!cachedRate) {
      try {
        const [from, to] = currencyPair.split('-');
        const data = await this.fixerApi.getLatest(from, to);
        const date = new Date(
          data.timestamp * constants.MILLISECONDS_PER_SECOND,
        );
        const rate = {
          pair: currencyPair,
          rate: data.rates[to],
          date,
        };
        await this.cache.set(currencyPair, JSON.stringify(rate));
        return rate;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    return cachedRate;
  }

  @Cron(CronExpression.EVERY_HOUR)
  private async updateCacheWithRatesCron() {
    const cachedPairs: TCurrencyPair[] = await this.cache.store.keys();
    const fixedCurrencyPairs: TCurrencyPair[] = [
      'USD-SGD',
      'SGD-USD',
      'USD-HKD',
      'HKD-USD',
    ];
    const currencyPairs = [...new Set(cachedPairs.concat(fixedCurrencyPairs))];
    await Promise.map(currencyPairs, (pair) => {
      const [from, to] = pair.split('-');
      return this.getRate({ from, to });
    });
  }
}
