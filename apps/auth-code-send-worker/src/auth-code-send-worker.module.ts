import { Logger, Module } from '@nestjs/common'
import { AuthCodeSendWorkerService } from './auth-code-send-worker.service'
import * as process from 'process'
import { ConfigModule } from '@nestjs/config'
import { mysqlConfig } from '../../../libs/common/src/config/mysql.config'
import { redisConfig } from '../../../libs/common/src/config/redis.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [mysqlConfig, redisConfig],
    }),
  ],
  providers: [Logger, AuthCodeSendWorkerService],
})
export class AuthCodeSendWorkerModule {}
