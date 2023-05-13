import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HealthModule } from './health/health.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as process from 'process'
import { mysqlConfig, mysqlConfigKey } from './config/mysql.config'
import { TypeOrmModule } from '@nestjs/typeorm'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
