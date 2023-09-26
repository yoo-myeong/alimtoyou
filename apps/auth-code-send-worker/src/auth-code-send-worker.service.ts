import { EmailCodeRepository } from '../../../libs/redis/src/email-code/email-code.repository'
import { Mailer } from '../../../libs/mailer/src/Mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthCodeSendWorkerService {
  constructor(
    private readonly emailCodeRepository: EmailCodeRepository,
    private readonly mailer: Mailer,
  ) {}

  async sendCodeToMail(email: string) {
    const code = await this.emailCodeRepository.getEmailCodeByEmail(email)
    await this.mailer.sendMail('me', 'you', code)
  }
}
