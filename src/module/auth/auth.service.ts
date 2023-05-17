import { Injectable } from '@nestjs/common'
import { AuthDomain } from './auth.domain'
import { Repository } from 'typeorm'
import { UserEntity } from '../../entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async save(authDomain: AuthDomain) {
    await this.userRepository.insert(authDomain.toUserEntity())
  }
}
