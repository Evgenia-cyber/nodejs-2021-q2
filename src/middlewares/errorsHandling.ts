import { logger } from './logging';
import { StatusCode, Messages } from '../types/statusCodes';

interface IError {
  status: number;
  error: string;
}

class CustomError extends Error implements IError {
  status: number;

  error: string;

  constructor(statusCode: number, errorMessage: string) {
    super();
    this.status = statusCode;
    this.error = errorMessage;
  }
}

const catchAndLogErrors = async (
  err: CustomError,
  _req: any,
  res: any,
  next: any
) => {
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

export { catchAndLogErrors, wrapper, CustomError };
