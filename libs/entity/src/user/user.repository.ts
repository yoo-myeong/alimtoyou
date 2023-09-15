import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomError } from '../../../common/src/error/CustomError'
import { ResponseStatus } from '../../../common/src/res/ResponseStatus'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userEntityRepository.findOneBy({ email })
    if (!!user)
      throw new CustomError(
        ResponseStatus.DUPLICATED_EMAIL,
        '이미 존재하는 이메일입니다.',
      )

    return user
  }
}
