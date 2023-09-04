import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserEntityModule } from '../../../../../libs/entity/src/user/user-entity.module'

@Module({
  imports: [UserEntityModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
