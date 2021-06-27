import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { wrapper, CustomError } from '../../middlewares';
import { usersService } from '../users/user.service';
import { StatusCode, Messages } from '../../types/statusCodes';
import { JWT_SECRET_KEY } from '../../common/config';

const router = express.Router();

/** login user */
router.route('/').post(
  wrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const { login, password } = body;
    if (!login || !password) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const user = await usersService.getUserByLogin(login);
    if (user) {
      const matches = bcrypt.compareSync(password, user.password);
      if (matches && JWT_SECRET_KEY) {
        const token = jwt.sign(
          { id: user.id, login: user.login },
          JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60 * 24,
          }
        );
        res.status(StatusCode.OK).json({
          token,
        });
      } else {
        throw new CustomError(
          StatusCode.FORBIDDEN,
          `Password do not match. ${Messages.FORBIDDEN}`
        );
      }
    } else {
      throw new CustomError(
        StatusCode.FORBIDDEN,
        `User with login ${login} not exists. ${Messages.FORBIDDEN}`
      );
    }
  })
);

export { router };
