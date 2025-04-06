import { format } from 'winston';

export const jsonFormat = format((info) => {
  const { timestamp, level, message, ...rest } = info;
  return {
    timestamp,
    level,
    message,
    ...rest,
  };
});