import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetRateArgs } from './Args/get-rate.args';
import { ForexService } from './forex.service';
import { Rate } from './Models/rate';

@Resolver(() => Rate)
export class ForexResolver {
  constructor(private readonly forexService: ForexService) {}

  @Query(() => [Rate], { name: 'rates' })
  async getRates(@Args() getRateArgs: GetRateArgs): Promise<Rate[]> {
    return this.forexService.getRates(getRateArgs);
  }
}
