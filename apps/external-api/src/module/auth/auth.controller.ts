import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SingUpRequestBody } from './dto/SingUpRequestBody'
import { AuthCodeCreator } from '../../../../../libs/common/src/domain/auth/authCodeCreator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SingUpRequestBody) {
    const authDomain = await body.toAuthDomain(new AuthCodeCreator())

    await this.authService.save(authDomain)
  }
}
