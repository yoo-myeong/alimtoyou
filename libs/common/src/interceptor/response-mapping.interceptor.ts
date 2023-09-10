import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { instanceToPlain } from 'class-transformer'
import { ResponseEntity } from '../res/ResponseEntity'

@Injectable()
export class ResponseMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(ResponseEntity.successWith(data))
      }),
    )
  }
}
