import { registerAs } from '@nestjs/config'
import * as process from 'process'

export const redisConfigKey = 'redisConfigKey'
export const redisConfig = registerAs(redisConfigKey, () => ({
  config: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  },
}))
