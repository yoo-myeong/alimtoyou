import { Test } from '@nestjs/testing'
import { getMySQLTypeOrmTestModule } from '../../getMySQLTypeOrmTestModule'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { SingUpRequestBody } from '../../../src/module/auth/dto/SingUpRequestBody'
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
    }).compile()

    app = module.createNestApplication()
    setApp(app)
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
    const dto = new SingUpRequestBody()
    dto.email = 'a@email.com'

    const res = await request(app.getHttpServer()).post('/auth').send(dto)

    expect(res.statusCode).toBe(HttpStatus.CREATED)
  })
})
