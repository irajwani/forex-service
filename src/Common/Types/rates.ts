import { Symbols } from './symbols';

export type TRates = {
  [key in Symbols]?: number;
};
