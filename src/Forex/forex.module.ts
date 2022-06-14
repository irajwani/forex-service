import { CacheModule, Module } from '@nestjs/common';
import constants from '../Common/constants';
import { FixerApiModule } from '../Common/Modules/FixerApi/fixer-api.module';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';
import * as RedisStore from 'cache-manager-redis-store';
import { ForexResolver } from './forex.resolver';
import { DateScalar } from '../Common/GraphQL/Scalars/DateScalar';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          store: RedisStore,
          host: configService.get<string>('app.redisHost'),
          port: configService.get<number>('app.redisPort'),
          ttl: constants.HOUR,
        };
      },
      inject: [ConfigService],
    }),
    FixerApiModule,
  ],
  controllers: [ForexController],
  providers: [DateScalar, ForexResolver, ForexService],
})
export class ForexModule {}
