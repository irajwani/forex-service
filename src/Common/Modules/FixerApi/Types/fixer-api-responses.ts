import { TRates } from 'src/Common/Types/rates';
import { Symbols } from 'src/Common/Types/symbols';

export interface IGetRatesData {
  success: boolean;
  timestamp: number;
  base: Symbols;
  date: string;
  rates: TRates;
}
