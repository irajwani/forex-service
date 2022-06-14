import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from 'nestjs-http-promise';
import { FixerApiService } from './fixer-api.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          timeout: configService.get<number>('app.httpTimeout'),
          retries: configService.get<number>('app.httpRetryAttempts'),
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
