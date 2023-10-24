import { IsEmail, IsString } from 'class-validator'
import { AuthDomain } from '../../../../../../libs/domain/src/auth/auth.domain'
import { AuthCodeCreator } from '../../../../../../libs/domain/src/auth/authCodeCreator'

export class LoginRequestBody {
  @IsString()
  @IsEmail()
  email: string

  async toAuthDomain(authCodeCreator: AuthCodeCreator) {
    return await AuthDomain.create({ email: this.email, authCodeCreator })
  }
}
