import { IsEmail } from 'class-validator'
import { Expose } from 'class-transformer'
import { from } from '../../../../utils/src/from'
import { AuthCodeCreator } from './authCodeCreator'
import { UserEntity } from '../../../../entity/src/user/user.entity'

export class AuthDomain {
  private static readonly CODE_LENGTH = 6

  @IsEmail()
  @Expose({ name: 'email' })
  private readonly _email: string

  private _code: string

  static async create(ctx: {
    email: string
    authCodeCreator: AuthCodeCreator
  }) {
    const domain = await from(this, {
      email: ctx.email,
    })
    domain._code = ctx.authCodeCreator.createCode(this.CODE_LENGTH)
    return domain
  }

  toUserEntity() {
    const user = new UserEntity()
    user.email = this._email

    return user
  }

  get email() {
    return this._email
  }

  get redisCachingData() {
    return JSON.stringify({
      code: this._code,
    })
  }
}
