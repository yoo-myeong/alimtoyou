import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestBody } from './dto/LoginRequestBody'
import { AuthCodeCreator } from '../../../../../libs/common/src/domain/auth/authCodeCreator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginRequestBody) {
    await this.authService.login(await body.toAuthDomain(new AuthCodeCreator()))
  }
}
