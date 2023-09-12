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
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseMappingInterceptor } from '../../../libs/common/src/interceptor/response-mapping.interceptor'
import { AllExceptionsFilter } from '../../../libs/common/src/filter/api/all-expcpetion.filter'
import { BadParameterFilter } from '../../../libs/common/src/filter/api/bad-parameter.filter'
import { NotFoundExceptionsFilter } from '../../../libs/common/src/filter/api/not-found-exceptions.filter'
import { ForbiddenExceptionFilter } from '../../../libs/common/src/filter/api/forbidden-exception.filter'
import { UnauthorizedExceptionFilter } from '../../../libs/common/src/filter/api/unauthorized-exception.filter'

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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadParameterFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
  ],
})
export class AppModule {}
