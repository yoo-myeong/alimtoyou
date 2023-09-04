import { Test, TestingModule } from '@nestjs/testing'
import { getMySQLTypeOrmTestModule } from '../../../../getMySQLTypeOrmTestModule'
import { AuthService } from '../../../../../src/module/auth/auth.service'
import { AuthDomain } from '../../../../../src/module/auth/auth.domain'
import { AuthCodeCreator } from '../../../../../src/module/auth/authCodeCreator'
import { DataSource, Repository } from 'typeorm'
import { UserEntity } from '@app/entity/user/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ConflictException } from '@nestjs/common'
import { UserEntityModule } from '@app/entity/user/user-entity.module'

describe('AuthService', () => {
  let userRepository: Repository<UserEntity>
  let dataSource: DataSource

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getMySQLTypeOrmTestModule(), UserEntityModule],
    }).compile()

    userRepository = module.get(getRepositoryToken(UserEntity))
    dataSource = module.get<DataSource>(DataSource)
  })

  beforeEach(async () => {
    await userRepository.delete({})
  })

  afterAll(async () => {
    await dataSource.destroy()
  })

  it('유저 정보를 저장합니다', async () => {
    const authService = new AuthService(userRepository)
    const email = 'a@email.com'
    const authDomain = await AuthDomain.create({
      email,
      authCodeCreator: new AuthCodeCreator(),
    })

    await authService.save(authDomain)
    const users = await userRepository.find({
      where: {
        email,
      },
    })

    expect(users.length).toBe(1)
  })

  it('동일 이메일은 저장할 수 없습니다', async () => {
    const authService = new AuthService(userRepository)
    const email = 'a@email.com'
    const authDomain = await AuthDomain.create({
      email,
      authCodeCreator: new AuthCodeCreator(),
    })

    await authService.save(authDomain)

    await expect(authService.save(authDomain)).rejects.toThrow(
      ConflictException,
    )
  })
})
