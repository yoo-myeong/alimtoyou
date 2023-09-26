import { Module } from '@nestjs/common'
import { Mailer } from './Mailer'

@Module({
  providers: [Mailer],
  exports: [Mailer],
})
export class MailerModule {}
