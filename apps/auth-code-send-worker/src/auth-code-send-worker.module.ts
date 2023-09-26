import { Logger, Module } from '@nestjs/common'
import { AuthCodeSendWorkerConsumer } from './auth-code-send-worker.consumer'
import * as process from 'process'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  mysqlConfig,
  mysqlConfigKey,
} from '../../../libs/common/src/config/mysql.config'
import {
  redisConfig,
  redisConfigKey,
} from '../../../libs/common/src/config/redis.config'
import { MailerModule } from '../../../libs/mailer/src/mailer.module'
import { AuthCodeSendWorkerService } from './auth-code-send-worker.service'
import { RedisRepositoryModule } from '../../../libs/redis/src/redis-repository.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from '@liaoliaots/nestjs-redis'

@Module({
  imports: [
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
    RedisRepositoryModule,
    MailerModule,
  ],
  providers: [Logger, AuthCodeSendWorkerConsumer, AuthCodeSendWorkerService],
})
export class AuthCodeSendWorkerModule {}
