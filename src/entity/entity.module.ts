import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserEntity],
  exports: [UserEntity, TypeOrmModule],
})
export class EntityModule {}
