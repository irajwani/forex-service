import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Rate {
  @Field({
    description:
      'currency pair where FROM-TO represents 1 unit of FROM currency purhcases x units of TO currency',
  })
  pair: string;

  @Field(() => Float)
  rate: number;

  @Field({
    description:
      'Date at which this rate was last fetched and cached. It will expire from cache in 1 hour.',
  })
  date: Date;
}
