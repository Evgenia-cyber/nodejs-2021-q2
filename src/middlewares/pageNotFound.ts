import { Request } from 'express';
import { Messages, StatusCode } from '../types/statusCodes';
import { CustomError } from './errorsHandling';

const pageNotFound = (req: Request): void => {
  const { secure, originalUrl } = req;
  const protocol = secure ? 'https' : 'http';
  const host = req.get('host');

  throw new CustomError(
    StatusCode.NOT_FOUND,
    `Page ${protocol}://${host}${originalUrl} ${Messages.NOT_FOUND}`
  );
};

export { pageNotFound };
