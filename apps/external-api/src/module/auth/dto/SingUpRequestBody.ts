import { IsEmail, IsString } from 'class-validator'
import { AuthDomain } from '../../../../../../libs/common/src/domain/auth/auth.domain'
import { AuthCodeCreator } from '../../../../../../libs/common/src/domain/auth/authCodeCreator'

export class SingUpRequestBody {
  @IsString()
  @IsEmail()
  email: string

  async toAuthDomain(authCodeCreator: AuthCodeCreator) {
    return await AuthDomain.create({ email: this.email, authCodeCreator })
  }
}
