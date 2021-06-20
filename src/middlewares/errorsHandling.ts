import { NextFunction, Request, RequestHandler, Response } from 'express';
import { formateJSONstringify } from '../utils';
import { logger } from '../common/logger';
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
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status
    ? err.status
    : StatusCode.INTERNAL_SERVER_ERROR;

  const errorMessage = err.error ? err.error : Messages.INTERNAL_SERVER_ERROR;

  await res.status(errorStatus).json({ error: errorMessage });

  logger.error(
    formateJSONstringify({ status: errorStatus, error: errorMessage })
  );

  next();
};

const wrapper = (func: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

const logError = (error: string) => {
  const status = StatusCode.INTERNAL_SERVER_ERROR;
  logger.error(formateJSONstringify({ status, error }));
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};

export { catchAndLogErrors, wrapper, CustomError, logError };
