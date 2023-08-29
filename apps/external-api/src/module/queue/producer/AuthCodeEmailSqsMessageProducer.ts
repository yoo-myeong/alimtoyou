import { Injectable } from '@nestjs/common'
import { SqsService } from '@ssut/nestjs-sqs'

@Injectable()
export class AuthCodeEmailSqsMessageProducer {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any, queueName: string) {
    const message: any = { body, id: body.id }
    await this.sqsService.send(queueName, message)
  }
}
