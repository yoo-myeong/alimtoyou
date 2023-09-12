import { Catch, Logger, NotFoundException } from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception.filter'
import { ResponseStatus } from '../../res/ResponseStatus'

@Catch(NotFoundException)
export class NotFoundExceptionsFilter extends HttpExceptionFilter {
  constructor(logger: Logger) {
    super(logger, ResponseStatus.NOT_FOUND)
  }
}
