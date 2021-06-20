import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { formateJSONstringify } from '../utils';
import { logger } from '../common/logger';

const logInfo = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, params, query, body } = req;
  next();

  finished(res, () => {
    const { status } = res;
    logger.info(
      formateJSONstringify({ method, url, params, query, status, body })
    );
  });
};

export { logInfo };
