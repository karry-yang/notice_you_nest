// src/common/filters/http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { MyApiResponse } from '../dto/api-response.dto';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let code: HttpStatus = status;
      let errorData: any = null;
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        code = status;
        const res = exception.getResponse();
        if (typeof res === 'string') {
          message = res;
        } else if (typeof res === 'object') {
          message = (res as any).message ?? message;
          errorData = (res as any).error ?? null;
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }
  
      response.status(status).json(
        MyApiResponse.error(errorData ?? message, code, {
          path: request.url,
          method: request.method,
        }),
      );
    }
  }
  