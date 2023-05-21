import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as process from 'process'
import { mysqlConfig, mysqlConfigKey } from './config/mysql.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './module/auth/auth.module'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { askForProjectName } from '@nestjs/cli/lib/utils/project-utils'
import { redisConfigKey } from './config/redis.config'

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [mysqlConfig],
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
})
export class AppModule {}
