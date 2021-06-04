import { logger } from './logging';
import { StatusCode, Messages } from '../types/statusCodes';

const catchAndLogErrors = async (err: any, _req: any, res: any, next: any) => {
  const errorStatus = err.status
    ? err.status
    : StatusCode.INTERNAL_SERVER_ERROR;

  const errorMessage = err.error ? err.error : Messages.INTERNAL_SERVER_ERROR;

  await res.status(errorStatus).json({ error: errorMessage });

  logger.error(JSON.stringify({ status: errorStatus, error: errorMessage }));

  next();
};

const wrapper = (func: any) => async (req: any, res: any, next: any) => {
  try {
    await func(req, res);
  } catch (err) {
    next(err);
  }
};

export { catchAndLogErrors, wrapper };
