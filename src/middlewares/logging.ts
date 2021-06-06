import { Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.colorize(),
    format.cli(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json()),
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json()),
    }),
  ],
});

const logInfo = (req: Request, res: Response) => {
  const { method, url, params, query, body } = req;
  const { status } = res;
  logger.info(JSON.stringify({ method, url, params, query, status, body }));
};

const logError = (error: string) => {
  logger.error(JSON.stringify({ error }));
  // process.exitCode = 1;
  // process.exit(1);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};

export { logger, logInfo, logError };
