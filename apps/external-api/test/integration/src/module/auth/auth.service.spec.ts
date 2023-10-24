import { Test, TestingModule } from '@nestjs/testing'
import { getMySQLTypeOrmTestModule } from '../../../../getMySQLTypeOrmTestModule'
import { AuthService } from '../../../../../src/module/auth/auth.service'
import { AuthDomain } from '@app/domain/auth/auth.domain'
import { AuthCodeCreator } from '@app/domain/auth/authCodeCreator'
import { DataSource, Repository } from 'typeorm'
import { UserEntity } from '@app/entity/user/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntityModule } from '@app/entity/user/user-entity.module'
import { UserRepository } from '@app/entity/user/user.repository'
import { CustomError } from '../../../../../../../libs/common/src/error/CustomError'
import { EmailCodeRepository } from '@app/redis/email-code/email-code.repository'
import { RedisRepository } from '@app/redis/redis.repository'
import Redis from 'ioredis'
import { RedisService } from '@liaoliaots/nestjs-redis'

describe('AuthService', () => {
  let userEntityRepository: Repository<UserEntity>
  let userRepository: UserRepository
  let dataSource: DataSource
  let redis: Redis
  let emailCodeRepository: EmailCodeRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getMySQLTypeOrmTestModule(), UserEntityModule],
    }).compile()

    userEntityRepository = module.get(getRepositoryToken(UserEntity))
    dataSource = module.get<DataSource>(DataSource)

    userRepository = new UserRepository(userEntityRepository)

    const redisService = module.get(RedisService)
    redis = redisService.getClient()
    const redisRepository = new RedisRepository(redisService)
    emailCodeRepository = new EmailCodeRepository(redisRepository)
  })

  beforeEach(async () => {
    await userEntityRepository.delete({})
    await redis.flushall()
  })

  afterAll(async () => {
    await dataSource.destroy()
    await redis.quit()
  })

  it('유저 정보를 저장합니다', async () => {
    const authService = new AuthService(
      userEntityRepository,
      userRepository,
      emailCodeRepository,
    )
    const email = 'a@email.com'
    const authDomain = await AuthDomain.create({
      email,
      authCodeCreator: new AuthCodeCreator(),
    })

    await authService.save(authDomain)
    const users = await userEntityRepository.find({
      where: {
        email,
      },
    })

    expect(users.length).toBe(1)
  })

  it('동일 이메일은 저장할 수 없습니다', async () => {
    const authService = new AuthService(
      userEntityRepository,
      userRepository,
      emailCodeRepository,
    )
    const email = 'a@email.com'
    const authDomain = await AuthDomain.create({
      email,
      authCodeCreator: new AuthCodeCreator(),
    })

    await authService.save(authDomain)

    await expect(authService.save(authDomain)).rejects.toThrow(CustomError)
  })
})
