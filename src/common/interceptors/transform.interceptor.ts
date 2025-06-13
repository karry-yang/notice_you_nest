// src/common/interceptors/transform.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  import { MyApiResponse } from '../dto/api-response.dto';
  
  @Injectable()
  export class TransformInterceptor<T> implements NestInterceptor<T, MyApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<MyApiResponse<T>> {
      return next.handle().pipe(
        map((data) => {
          // 如果已经是 ApiResponse，就不再包装
          if (data instanceof MyApiResponse) return data;
          return MyApiResponse.success(data);
        }),
      );
    }
  }
  