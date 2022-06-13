import { Symbols } from './symbols';

export type TRates = {
  [key in Symbols]?: number;
};

export type TCurrencyPair = `${Symbols}-${Symbols}`;
