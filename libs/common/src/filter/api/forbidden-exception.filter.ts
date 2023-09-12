import { Catch, ForbiddenException, Logger } from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception.filter'
import { ResponseStatus } from '../../res/ResponseStatus'

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter extends HttpExceptionFilter {
  constructor(logger: Logger) {
    super(logger, ResponseStatus.FORBIDDEN)
  }
}
