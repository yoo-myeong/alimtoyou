import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'

export function setApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      whitelist: true,
      validationError: {
        target: true,
        value: true,
      },
      transform: true,
    }),
  )
}
