import { Injectable } from '@nestjs/common'
import { AuthDomain } from '../../../../../libs/domain/src/auth/auth.domain'
import { Repository } from 'typeorm'
import { UserEntity } from '../../../../../libs/entity/src/user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../../../../../libs/entity/src/user/user.repository'
import { AuthCodeCreator } from '../../../../../libs/domain/src/auth/authCodeCreator'
import { EmailCodeRepository } from '../../../../../libs/redis/src/email-code/email-code.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly userRepository: UserRepository,
    private readonly emailCodeRepository: EmailCodeRepository,
  ) {}

  async login(auth: AuthDomain) {
    await this.emailCodeRepository.setEmailCode(auth)
  }

  public async save(authDomain: AuthDomain) {
    await this.userRepository.getByEmail(authDomain.email)
    await this.userEntityRepository.insert(authDomain.toUserEntity())
  }
}
