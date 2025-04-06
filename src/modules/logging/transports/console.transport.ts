import { transports, format } from 'winston';

export const createConsoleTransport = () => new transports.Console({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.colorize(),
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  handleExceptions: true,
});