import { RedisModule } from '@liaoliaots/nestjs-redis'

export const getRedisTestModule = () => {
  return RedisModule.forRoot({
    config: {
      host: 'localhost',
      port: 6380,
    },
  })
}
