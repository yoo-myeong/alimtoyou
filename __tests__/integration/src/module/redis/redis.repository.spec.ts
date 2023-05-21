import { Test, TestingModule } from '@nestjs/testing'
import { RedisService } from '@liaoliaots/nestjs-redis'
import { getRedisTestModule } from '../../../../getRedisTestModule'
import { RedisRepository } from '../../../../../src/module/redis/redis.repository'
import Redis from 'ioredis'

describe('RedisRepository', () => {
  let redis: Redis
  let redisService: RedisService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getRedisTestModule()],
    }).compile()

    redisService = module.get(RedisService)
    redis = redisService.getClient()
  })

  beforeEach(async () => await redis.flushall())

  afterAll(async () => await redis.quit())

  it('redis에 key, value를 저장할 수 있습니다', async () => {
    const redisRepository = new RedisRepository(redisService)
    const key = 'key'
    const value = 'value'

    await redisRepository.set(key, value)
    const res = await redisRepository.get(key)

    expect(res).toBe(value)
  })

  it('redis에 key,value를 ttl과 함께 저장할 수 있습니다', async () => {
    const redisRepository = new RedisRepository(redisService)
    const key = 'key'
    const value = 'value'
    const ttl = 10

    await redisRepository.set(key, value, ttl)
    await new Promise((r) => setTimeout(r, ttl * 2))
    const res = await redisRepository.get(key)

    expect(res).toBeNull()
  })
})
