import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpStatus, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      whitelist: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  )
  await app.listen(3000)
}
bootstrap()
