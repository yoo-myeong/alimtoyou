import { AuthDomain } from '../../../domain/src/auth/auth.domain'
import { RedisRepository } from '../redis.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailCodeRepository {
  static emailCodeKeyPrefix = 'emailCode'

  constructor(private readonly redisRepository: RedisRepository) {}

  private getEmailCodeKey(postfix: string) {
    return `${EmailCodeRepository.emailCodeKeyPrefix}:${postfix}`
  }

  async setEmailCode(auth: AuthDomain) {
    await this.redisRepository.set(
      this.getEmailCodeKey(auth.email),
      auth.redisCachingData,
    )
  }

  async getEmailCodeByEmail(email: string) {
    return await this.redisRepository.get(this.getEmailCodeKey(email))
  }
}
