import {
  HttpStatus,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common'
import process from 'process'
import { getNodeEnv } from '../NodeEnv'
import { AsyncTracer } from '../AsyncTracer'
import { v4 as uuidV4 } from 'uuid'
import { CustomLogger } from '../logger/CustomLogger'
import { Request, Response, NextFunction } from 'express'

export function setApp(app: INestApplication, moduleName: string) {
  const nodeEnv = getNodeEnv(process.env.NODE_ENV)

  app.use((req: Request, res: Response, next: NextFunction) =>
    AsyncTracer.scope(uuidV4(), next),
  )

  app.useLogger(new CustomLogger(nodeEnv, moduleName))

  const logger = app.get(Logger)

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log(
      `[REQUEST] ${JSON.stringify({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      })}`,
    )

    let responseBody = {}
    const originalSend = res.send
    res.send = (...args) => {
      responseBody = args[0]
      return originalSend.apply(res, args)
    }

    res.on('finish', () => {
      logger.log(
        `[RESPONSE] ${JSON.stringify({
          statusCode: res.statusCode,
          headers: res.getHeaders(),
          body: responseBody,
        })}`,
      )
    })

    next()
  })

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
