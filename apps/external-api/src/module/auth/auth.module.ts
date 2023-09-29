import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserEntityModule } from '../../../../../libs/entity/src/user/user-entity.module'
import { RedisRepositoryModule } from '../../../../../libs/redis/src/redis-repository.module'

@Module({
  imports: [UserEntityModule, RedisRepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
