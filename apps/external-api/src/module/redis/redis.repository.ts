import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { RedisService } from '@liaoliaots/nestjs-redis'

@Injectable()
export class RedisRepository {
  private readonly redis: Redis

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient()
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      return this.redis.set(key, value, 'PX', ttl)
    }

    return this.redis.set(key, value)
  }

  async get(key: string) {
    return this.redis.get(key)
  }
}
