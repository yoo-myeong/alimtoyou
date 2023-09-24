import { Injectable, Logger } from '@nestjs/common'
import { Message } from 'aws-sdk/clients/sqs'
import { Consumer } from 'sqs-consumer'
import { SQSClient } from '@aws-sdk/client-sqs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthCodeSendWorkerService {
  private consumer: Consumer

  constructor(private readonly configService: ConfigService) {
    this.consumer = Consumer.create({
      queueUrl: configService.getOrThrow('AUTH_CODE_SEND_SQS_URL'),
      handleMessageBatch: async (messages: Message[]) => {
        console.log(messages.map((e) => e.Body))
        throw new Error()
      },
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
}
