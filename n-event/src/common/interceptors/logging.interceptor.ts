import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const statusCode = context.switchToHttp().getResponse()['statusCode'];
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    const { rawHeaders, httpVersion, method, socket, url } = request;
    const { remoteAddress, remoteFamily } = socket;
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        // console.log(this.eventEmitter);
        this.eventEmitter.emit('log', {
          msg: JSON.stringify({
            ts: `${Date.now() - now}`,
            className,
            methodName,
            statusCode,
            rawHeaders,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url,
          }),
        });
      }),
    );
  }
}
