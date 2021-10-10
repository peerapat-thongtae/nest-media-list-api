import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseReturn<T> {
  statusCode: number;
  message: any;
  data: T;
  [key: string]: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseReturn<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseReturn<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    let success = true;
    if (statusCode >= 400) {
      success = false;
    }
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        success,
        ...data,
      })),
    );
  }
}
