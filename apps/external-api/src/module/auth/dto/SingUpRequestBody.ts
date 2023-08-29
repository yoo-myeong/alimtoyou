import { IsEmail, IsString } from 'class-validator'
import { AuthDomain } from '../auth.domain'
import { AuthCodeCreator } from '../authCodeCreator'

export class SingUpRequestBody {
  @IsString()
  @IsEmail()
  email: string

  async toAuthDomain(authCodeCreator: AuthCodeCreator) {
    return await AuthDomain.create({ email: this.email, authCodeCreator })
  }
}
