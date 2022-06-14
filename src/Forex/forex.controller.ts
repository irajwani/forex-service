import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
  HttpStatus,
  Put,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetRateArgs } from './Args/get-rate.args';
import { ForexService } from './forex.service';

@Controller('forex')
@ApiTags('Foreign exchange rates')
export class ForexController {
  constructor(private readonly forexService: ForexService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public getRate(@Body() body: GetRateArgs) {
    const { from, to } = body;
    return this.forexService.getRate({ from, to });
  }
}
