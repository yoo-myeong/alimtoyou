import { Injectable, Logger } from '@nestjs/common'
import { Message } from 'aws-sdk/clients/sqs'
import { Consumer } from 'sqs-consumer'
import { SQSClient } from '@aws-sdk/client-sqs'
import { ConfigService } from '@nestjs/config'
import { AuthCodeSendWorkerService } from './auth-code-send-worker.service'

@Injectable()
export class AuthCodeSendWorkerConsumer {
  private consumer: Consumer

  constructor(
    private readonly configService: ConfigService,
    private readonly authCodeSendWorkerService: AuthCodeSendWorkerService,
  ) {
    this.consumer = Consumer.create({
      queueUrl: configService.getOrThrow('AUTH_CODE_SEND_SQS_URL'),
      handleMessageBatch: this.batchHandler.bind(this),
      batchSize: configService.getOrThrow('AUTH_CODE_SEND_WORKER_BATCH_SIZE'),
      sqs: new SQSClient({
        endpoint: configService.getOrThrow('SQS_URL'),
        region: configService.getOrThrow('AWS_REGION'),
        credentials: {
          accessKeyId: configService.getOrThrow('SQS_ACCESS_KEY_ID'),
          secretAccessKey: configService.getOrThrow('SQS_SECRET_KEY'),
        },
      }),
    })

    this.consumer.on('error', (err) => {
      Logger.error(err.message)
    })

    this.consumer.on('processing_error', (err) => {
      Logger.error(err.message)
    })

    this.consumer.start()
  }

  private async batchHandler(messages: Message[]) {
    await Promise.all(
      messages.map(async (it) => {
        const email = JSON.parse(it.Body)['email']
        await this.authCodeSendWorkerService.sendCodeToMail(email)
      }),
    )
  }
}
