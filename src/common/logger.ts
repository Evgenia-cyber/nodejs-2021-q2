import { createLogger, format, transports } from 'winston';

const consoleFormat = format.combine(
  format.colorize(),
  format.cli(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })
);

const fileFormat = format.combine(
  format.uncolorize(),
  format.json(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })
);

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: consoleFormat,
    }),
    new transports.File({
      dirname: './log/',
      filename: 'error.log',
      level: 'error',
      format: fileFormat,
    }),
    new transports.File({
      dirname: './log/',
      filename: 'info.log',
      level: 'info',
      format: fileFormat,
    }),
  ],
});

export { logger };