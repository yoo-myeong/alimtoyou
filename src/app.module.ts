import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as process from 'process'
import { mysqlConfig, mysqlConfigKey } from './config/mysql.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './module/auth/auth.module'

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
    AuthModule,
  ],
})
export class AppModule {}
