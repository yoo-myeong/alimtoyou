import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EntityModule } from '../../entity/entity.module'
import { UserEntity } from '../../entity/user.entity'

@Module({
  imports: [EntityModule],
  providers: [AuthService, UserEntity],
})
export class AuthModule {}
