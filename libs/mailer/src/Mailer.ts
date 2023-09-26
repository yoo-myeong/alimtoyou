import { Logger } from '@nestjs/common'

export class Mailer {
  async sendMail(sender: string, receiver: string, context: string) {
    Logger.log(`send mail ${context} to ${receiver} from ${sender}`)
  }
}
