export interface ILogger {
    log(message: string, meta?: Record<string, unknown>): void;
    error(message: string, trace?: string, meta?: Record<string, unknown>): void;
    warn(message: string, meta?: Record<string, unknown>): void;
    debug(message: string, meta?: Record<string, unknown>): void;
    verbose(message: string, meta?: Record<string, unknown>): void;
    
    withContext(context: string): ILogger;
    withRequestId(requestId: string): ILogger;
  }
