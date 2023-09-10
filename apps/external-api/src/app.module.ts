import { Logger, Module } from '@nestjs/common'
import { HealthModule } from './module/health/health.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as process from 'process'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './module/auth/auth.module'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import {
  mysqlConfig,
  mysqlConfigKey,
} from '../../../libs/common/src/config/mysql.config'
import {
  redisConfig,
  redisConfigKey,
} from '../../../libs/common/src/config/redis.config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseMappingInterceptor } from '../../../libs/common/src/interceptor/response-mapping.interceptor'

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [mysqlConfig, redisConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get(mysqlConfigKey)
      },
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get(redisConfigKey)
      },
    }),
    AuthModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMappingInterceptor,
    },
  ],
})
export class AppModule {}
