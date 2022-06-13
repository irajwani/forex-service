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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetRateArgs } from './Args/get-rate.args';
import { ForexService } from './forex.service';

@Controller('forex')
@ApiTags('foreign exchange rates')
export class ForexController {
  constructor(private readonly forexService: ForexService) {}

  @Get()
  public async getRate(@Query() query: GetRateArgs, @Res() response: Response) {
    const { from, to } = query;
    const rate = await this.forexService.getRate({ from, to });
    return response.status(HttpStatus.OK).json(rate);
  }
}
