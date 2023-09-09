import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setApp } from '../../../libs/common/src/config/setApp'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const moduleName = 'external-api'
  setApp(app, moduleName)
  await app.listen(3000)
}
bootstrap()
