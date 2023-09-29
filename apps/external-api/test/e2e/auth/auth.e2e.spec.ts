import { Test } from '@nestjs/testing'
import { getMySQLTypeOrmTestModule } from '../../getMySQLTypeOrmTestModule'
import { HttpStatus, INestApplication, Logger } from '@nestjs/common'
import { LoginRequestBody } from '../../../src/module/auth/dto/LoginRequestBody'
import request from 'supertest'
import { Repository } from 'typeorm'
import { UserEntity } from '@app/entity/user/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AuthModule } from '../../../src/module/auth/auth.module'
import { setApp } from '../../../../../libs/common/src/config/setApp'
import { UserEntityModule } from '@app/entity/user/user-entity.module'

describe('/auth', () => {
  let app: INestApplication
  let userEntityRepository: Repository<UserEntity>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserEntityModule, getMySQLTypeOrmTestModule(), AuthModule],
      providers: [Logger],
    }).compile()

    app = module.createNestApplication()
    setApp(app, 'test')
    userEntityRepository = module.get(getRepositoryToken(UserEntity))

    await app.init()
  })

  beforeEach(async () => {
    await userEntityRepository.clear()
  })

  afterAll(async () => {
    await app.close()
  })

  it('POST /auth', async () => {
    const dto = new LoginRequestBody()
    dto.email = 'a@email.com'

    const res = await request(app.getHttpServer()).post('/auth').send(dto)

    expect(res.statusCode).toBe(HttpStatus.CREATED)
  })
})
