import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsEnum } from 'class-validator';
import { Symbols } from '../../Common/Types/symbols';

@ArgsType()
export class GetRateArgs {
  @Field()
  @IsDefined()
  @IsEnum(Symbols)
  @ApiProperty({ enum: Symbols, name: 'from' })
  from: Symbols;

  @Field()
  @IsDefined()
  @IsEnum(Symbols, { each: true })
  @ApiProperty({ isArray: true, enum: Symbols, name: 'to' })
  to: Symbols[];
}
