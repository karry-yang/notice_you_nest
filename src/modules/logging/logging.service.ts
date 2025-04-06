import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { LOGGER_SERVICE } from './constants/logging.constants';
import { ILogger } from './contracts/logger.contract';

@Injectable()
export class LoggingService implements ILogger {
  private context: string = 'Application';
  private requestId: string | null = null;

  constructor(
    @Inject(LOGGER_SERVICE) 
    private readonly logger: Logger
  ) {}

  log(message: string, meta?: Record<string, unknown>) {
    this.logger.info(message, this.buildMeta(meta));
  }

  error(message: string, trace?: string, meta?: Record<string, unknown>) {
    this.logger.error(message, this.buildMeta({ ...meta, stack: trace }));
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.logger.warn(message, this.buildMeta(meta));
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.logger.debug(message, this.buildMeta(meta));
  }

  verbose(message: string, meta?: Record<string, unknown>) {
    this.logger.verbose(message, this.buildMeta(meta));
  }

  withContext(context: string): ILogger {
    const newLogger = new LoggingService(this.logger);
    newLogger.context = context;
    newLogger.requestId = this.requestId;
    return newLogger;
  }

  withRequestId(requestId: string): ILogger {
    const newLogger = new LoggingService(this.logger);
    newLogger.context = this.context;
    newLogger.requestId = requestId;
    return newLogger;
  }

  private buildMeta(meta?: Record<string, unknown>): Record<string, unknown> {
    return {
      ...meta,
      context: this.context,
      requestId: this.requestId,
    };
  }
}