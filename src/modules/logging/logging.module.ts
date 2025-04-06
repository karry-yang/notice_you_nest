import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggingConfig } from './logging.config';
import { LoggingService } from './logging.service';
import { LOGGER_SERVICE, LOGGER_OPTIONS } from './constants/logging.constants';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: LoggingConfig,
    }),
  ],
  providers: [
    {
      provide: LOGGER_SERVICE,
      useClass: LoggingService,
    },
    LoggingInterceptor,
  ],
  exports: [
    LOGGER_SERVICE,
    LoggingInterceptor,
  ],
})
export class LoggingModule {}