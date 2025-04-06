import { format } from 'winston';

const REDACTED = '[REDACTED]';

const sensitiveFields = [
  'password',
  'token',
  'authorization',
  'creditCard',
  'ssn'
];

export const sensitiveFilter = format((info) => {
  if (info.message && typeof info.message === 'string') {
    sensitiveFields.forEach(field => {
      const regex = new RegExp(`${field}=[^&]*`, 'gi');
      info.message = info.message.replace(regex, `${field}=${REDACTED}`);
    });
  }

  if (info.meta) {
    sensitiveFields.forEach(field => {
      if (info.meta[field]) {
        info.meta[field] = REDACTED;
      }
    });
  }

  return info;
});