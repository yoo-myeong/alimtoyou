import { ConflictException, Injectable } from '@nestjs/common'
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
    const userByEmail = await this.userRepository.findOneBy({
      email: authDomain.getEmail(),
    })
    if (userByEmail) throw new ConflictException()

    await this.userRepository.insert(authDomain.toUserEntity())
  }
}
