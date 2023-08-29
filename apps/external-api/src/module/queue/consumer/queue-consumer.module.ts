import { Module } from '@nestjs/common'
import { SqsModule } from '@ssut/nestjs-sqs'
import * as AWS from 'aws-sdk'
import { AuthCodeEmailSqsHandler } from './AuthCodeEmailSqsHandler'

AWS.config.update({
  region: process.env.SQS_REGION, // aws region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
})

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: process.env.EMAIL_QUEUE,
          queueUrl: process.env.EMAIL_QUEUE_URL,
          region: process.env.SQS_REGION,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [AuthCodeEmailSqsHandler],
  exports: [AuthCodeEmailSqsHandler],
})
export class SqsConsumerModule {}
