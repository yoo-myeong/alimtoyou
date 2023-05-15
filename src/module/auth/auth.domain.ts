import { IsEmail } from 'class-validator'
import { Expose } from 'class-transformer'
import { from } from '../../utils/from'
import { AuthCodeCreator } from './authCodeCreator'

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
}
