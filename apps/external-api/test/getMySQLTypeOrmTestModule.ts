import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as path from 'path'

export const getMySQLTypeOrmTestModule = () => {
  const entityPath = path.join(__dirname, '../../../src/**/*.ts')
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3309,
    username: 'root',
    password: '12341234',
    database: 'alimtoyou',
    entities: [entityPath],
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  })
}
