import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SingUpRequestBody } from './dto/SingUpRequestBody'
import { AuthCodeCreator } from './authCodeCreator'
import { plainToInstance } from 'class-transformer'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SingUpRequestBody) {
    body = plainToInstance(SingUpRequestBody, body)
    const authDomain = await body.toAuthDomain(new AuthCodeCreator())

    await this.authService.save(authDomain)
  }
}
