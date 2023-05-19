import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EntityModule } from '../../entity/entity.module'
import { UserEntity } from '../../entity/user.entity'
import { AuthController } from './auth.controller'

@Module({
  imports: [EntityModule],
  providers: [AuthService, UserEntity],
  controllers: [AuthController],
})
export class AuthModule {}
