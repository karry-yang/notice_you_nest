import { transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const createFileTransport = () => new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level: 'info',
});