import { Module } from '@nestjs/common'
import { RedisRepository } from './redis.repository'
import { EmailCodeRepository } from './email-code/email-code.repository'

@Module({
  providers: [RedisRepository, EmailCodeRepository],
  exports: [RedisRepository, EmailCodeRepository],
})
export class RedisRepositoryModule {}
