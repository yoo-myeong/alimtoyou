import { Catch, Logger, UnauthorizedException } from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception.filter'
import { ResponseStatus } from '../../res/ResponseStatus'

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter extends HttpExceptionFilter {
  constructor(logger: Logger) {
    super(logger, ResponseStatus.UNAUTHORIZED)
  }
}
