import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errorsHandling';
import { StatusCode, Messages } from '../types/statusCodes';
import { JWT_SECRET_KEY } from '../common/config';

const validate = (req: Request, _res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new CustomError(
        StatusCode.UNAUTHORIZED,
        ` ${Messages.UNAUTHORIZED}`
      );
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new CustomError(
        StatusCode.UNAUTHORIZED,
        ` ${Messages.UNAUTHORIZED}`
      );
    }
    if (!JWT_SECRET_KEY) {
      throw new CustomError(
        StatusCode.UNAUTHORIZED,
        `No secret key. ${Messages.UNAUTHORIZED}`
      );
    }
    jwt.verify(token, JWT_SECRET_KEY, (_err, decoded) => {
      if (decoded) {
        next();
      } else {
        throw new CustomError(
          StatusCode.UNAUTHORIZED,
          ` ${Messages.UNAUTHORIZED}`
        );
      }
    });
  }
};

export { validate };
