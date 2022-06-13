import { Field, Float, ObjectType } from '@nestjs/graphql';
import { TCurrencyPair } from 'src/Common/Types/rates';
import { Symbols } from 'src/Common/Types/symbols';

@ObjectType()
export class Rate {
  @Field()
  pair: TCurrencyPair;

  @Field(() => Float)
  rate: number;

  @Field()
  date: Date;
}
