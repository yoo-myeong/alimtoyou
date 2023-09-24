import { NestFactory } from '@nestjs/core'
import { AuthCodeSendWorkerModule } from './auth-code-send-worker.module'
import { setApp } from '../../../libs/common/src/config/setApp'

async function bootstrap() {
  const app = await NestFactory.create(AuthCodeSendWorkerModule)
  const moduleName = 'auth-code-send-worker'
  setApp(app, moduleName)
  await app.listen(3000)
}
bootstrap()
