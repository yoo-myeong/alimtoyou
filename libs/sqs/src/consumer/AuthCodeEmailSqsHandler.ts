import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { SqsMessageHandler } from '@ssut/nestjs-sqs'
import * as AWS from 'aws-sdk'

@Injectable()
export class AuthCodeEmailSqsHandler {
  constructor(private readonly logger: Logger) {}

  @SqsMessageHandler(process.env.TEST_QUEUE)
  async handleMessage(message: AWS.SQS.Message) {
    if (!!message.Body) {
      try {
        const obj = JSON.parse(message.Body)
        console.log(obj)
        await new Promise((res) => {
          setTimeout(() => {
            res(true)
          }, 3000)
        })
        console.log('Message processed')
        return
      } catch (error) {
        this.logger.error(error, message)
        throw new InternalServerErrorException(
          `Error in file processing ${error.message}`,
        )
      }
    }
  }
}
