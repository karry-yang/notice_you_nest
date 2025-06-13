// src/common/dto/api-response.dto.ts
export class MyApiResponse<T = unknown> {
    status!: 'success' | 'error';
    code!: number;
    data?: T;
    message?: string;
    timestamp?: number;
  
    constructor(partial: Partial<MyApiResponse<T>>) {
      Object.assign(this, {
        timestamp: Date.now(),
        ...partial,
      });
    }
  
    static success<T>(data: T, message?: string, code = 200): MyApiResponse<T> {
      return new MyApiResponse({
        status: 'success',
        code,
        data,
        message,
      });
    }
  
    static error<T>(message: string, code = 500, data?: T): MyApiResponse<T> {
      return new MyApiResponse({
        status: 'error',
        code,
        message,
        data,
      });
    }
  }
  