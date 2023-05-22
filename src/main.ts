import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setApp } from './config/setApp'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  setApp(app)
  await app.listen(3000)
}
bootstrap()
