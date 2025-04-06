import { Injectable } from '@nestjs/common';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import { format, transports } from 'winston';
import { jsonFormat } from './formats/json.format';
import { sensitiveFilter } from './formats/sensitive.filter';
import { createConsoleTransport } from './transports/console.transport';
import { createFileTransport } from './transports/file.transport';
import { createElasticsearchTransport } from './transports/elasticsearch.transport';

@Injectable()
export class LoggingConfig implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions() {
    const transportsList = [createConsoleTransport(), createFileTransport()];

    if (process.env.ELASTICSEARCH_URL) {
      transportsList.push(createElasticsearchTransport());
    }

    return {
      level: process.env.LOG_LEVEL ?? 'info',
      format: format.combine(
        format.timestamp(),
        sensitiveFilter(),
        jsonFormat(),
        format.json()
      ),
      transports: transportsList,
      exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' }),
      ],
      rejectionHandlers: [
        new transports.File({ filename: 'logs/rejections.log' }),
      ],
      exitOnError: false,
    };
  }
}