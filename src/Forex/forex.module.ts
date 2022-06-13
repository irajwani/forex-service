import { CacheModule, Module } from '@nestjs/common';
import constants from '../Common/constants';
import { FixerApiModule } from '../Common/Modules/FixerApi/fixer-api.module';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';
import * as RedisStore from 'cache-manager-redis-store';
import { ForexResolver } from './forex.resolver';
import { DateScalar } from '../Common/GraphQL/Scalars/DateScalar';

@Module({
  imports: [
    CacheModule.register({
      store: RedisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      ttl: constants.HOUR,
    }),
    FixerApiModule,
  ],
  controllers: [ForexController],
  providers: [DateScalar, ForexResolver, ForexService],
})
export class ForexModule {}
