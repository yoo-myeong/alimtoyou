import { Test } from '@nestjs/testing'
import { getMySQLTypeOrmTestModule } from '../../getMySQLTypeOrmTestModule'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as module from 'module'
import { SingUpRequestBody } from '../../../src/module/auth/dto/SingUpRequestBody'
import * as request from 'supertest'
import { Repository } from 'typeorm'
import { UserEntity } from '../../../src/entity/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EntityModule } from '../../../src/entity/entity.module'
import { AuthModule } from '../../../src/module/auth/auth.module'

describe('/auth', () => {
  let app: INestApplication
  let userEntityRepository: Repository<UserEntity>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [EntityModule, getMySQLTypeOrmTestModule(), AuthModule],
    }).compile()

    app = module.createNestApplication()
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
