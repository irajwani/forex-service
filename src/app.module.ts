import { Module } from '@nestjs/common';
import ConfigurationModule from './Configurations/Config/config.module';
import { HealthModule } from './Health/health.module';
import { ForexModule } from './Forex/forex.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigurationModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      include: [ForexModule],
    }),
    HealthModule,
    ForexModule,
  ],
})
export class AppModule {}
