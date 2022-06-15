import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsDefined,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Symbols } from '../../Common/Types/symbols';

registerEnumType(Symbols, {
  name: 'Symbols',
});

@ArgsType()
export class GetRateArgs {
  @Field(() => Symbols)
  @IsDefined()
  @IsEnum(Symbols)
  @ApiProperty({ enum: Symbols, name: 'from' })
  from: Symbols;

  @Field((type) => [Symbols])
  @IsDefined()
  @IsEnum(Symbols, { each: true })
  @ArrayUnique()
  @ApiProperty({ isArray: true, enum: Symbols, name: 'to' })
  to: Symbols[];
}
