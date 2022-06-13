import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from 'nestjs-http-promise';
import { FixerApiService } from './fixer-api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log(configService.get<string>('app'));
        return {
          timeout: 30000,
          retries: 5,
          baseURL: configService.get<string>('app.fixerApiUrl'),
          headers: { apikey: configService.get<string>('app.fixerApiKey') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [FixerApiService],
  exports: [FixerApiService],
})
export class FixerApiModule {}
