import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as Promise from 'bluebird';
import { FixerApiService } from '../Common/Modules/FixerApi/fixer-api.service';
import constants from '../Common/constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Symbols } from '../Common/Types/symbols';
import { Rate } from './Models/rate';
import { GetRateArgs } from './Args/get-rate.args';
import { TCurrencyPair } from '../Common/Types/rates';
import { InternalServerException } from '../Common/Errors';

@Injectable()
export class ForexService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly fixerApi: FixerApiService,
  ) {}

  private generateCurrencyPairs(from: Symbols, to: Symbols[]) {
    const pairs = [];
    to.forEach((symbol) => {
      pairs.push([from, symbol].join('-'));
    });
    return pairs;
  }

  public async getRates(args: GetRateArgs): Promise<Rate[]> {
    const { from, to } = args;
    const cachedRates: Rate[] = [];
    const noncachedSymbols: Symbols[] = [];
    const currencyPairs = this.generateCurrencyPairs(from, to);

    try {
      await Promise.map(currencyPairs, async (pair, index) => {
        const cachedRate: Rate = JSON.parse(await this.cache.get(pair));
        if (!cachedRate) noncachedSymbols.push(to[index]);
        else {
          cachedRates.push(cachedRate);
        }
      });

      const rates: Rate[] = [];

      if (noncachedSymbols.length > 0) {
        const data = await this.fixerApi.getLatest(from, noncachedSymbols);
        const date = new Date(
          data.timestamp * constants.MILLISECONDS_PER_SECOND,
        );

        await Promise.map(
          Object.entries(data.rates),
          async ([toCurrency, rate]) => {
            const pair = [from, toCurrency].join('-');
            const rateObj: Rate = {
              pair,
              date,
              rate,
            };
            rates.push(rateObj);
            await this.cache.set(pair, JSON.stringify(rateObj));
          },
        );
      }

      return cachedRates.concat(rates);
    } catch (err) {
      throw new InternalServerException();
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  private async updateCacheWithRatesCron() {
    const chosenRateRequests: GetRateArgs[] = [
      { from: Symbols.USD, to: [Symbols.SGD, Symbols.HKD] },
      { from: Symbols.SGD, to: [Symbols.USD] },
      { from: Symbols.HKD, to: [Symbols.USD] },
    ];
    await Promise.map(chosenRateRequests, ({ from, to }: GetRateArgs) => {
      return this.getRates({ from, to });
    });
  }
}
