import { Injectable } from '@nestjs/common'
import { AuthDomain } from '../../../../../libs/common/src/domain/auth/auth.domain'
import { Repository } from 'typeorm'
import { UserEntity } from '../../../../../libs/entity/src/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../../../../../libs/entity/src/user/user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly userRepository: UserRepository,
  ) {}

  public async save(authDomain: AuthDomain) {
    await this.userRepository.getByEmail(authDomain.getEmail())
    await this.userEntityRepository.insert(authDomain.toUserEntity())
  }
}
