import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [TypeOrmModule, UserRepository],
})
export class UserEntityModule {}
