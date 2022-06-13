import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';
import { Symbols } from '../../Common/Types/symbols';

@ArgsType()
export class GetRateArgs {
  @Field()
  @IsDefined()
  @IsEnum(Symbols)
  from: Symbols;

  @Field()
  @IsDefined()
  @IsEnum(Symbols)
  to: Symbols;
}
