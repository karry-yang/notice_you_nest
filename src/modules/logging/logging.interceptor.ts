import { 
    Injectable, 
    NestInterceptor, 
    ExecutionContext, 
    CallHandler,
    Inject,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { LOGGER_SERVICE } from './constants/logging.constants';
  import { ILogger } from './contracts/logger.contract';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(
      @Inject(LOGGER_SERVICE) 
      private readonly logger: ILogger
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, originalUrl, headers, body, params, query } = request;
      const requestId = headers['x-request-id'] || Date.now().toString();
  
      const logger = this.logger.withRequestId(requestId);
      
      logger.log(`Incoming request`, {
        type: 'request',
        method,
        url: originalUrl,
        headers: this.sanitizeHeaders(headers),
        body: this.sanitizeBody(body),
        params,
        query,
      });
  
      const startTime = Date.now();
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          const elapsedTime = Date.now() - startTime;
          
          logger.log(`Request completed`, {
            type: 'response',
            method,
            url: originalUrl,
            statusCode: response.statusCode,
            elapsedTime: `${elapsedTime}ms`,
          });
        }),
      );
    }
  
    private sanitizeHeaders(headers: Record<string, any>) {
      const result = { ...headers };
      delete result.authorization;
      delete result.cookie;
      return result;
    }
  
    private sanitizeBody(body: Record<string, any>) {
      if (!body) return body;
      
      const result = { ...body };
      if (result.password) result.password = '[REDACTED]';
      if (result.token) result.token = '[REDACTED]';
      return result;
    }
  }