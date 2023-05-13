import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const mysqlConfigKey = 'mysqlConfig'
export const mysqlConfig = registerAs(
  mysqlConfigKey,
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
)
