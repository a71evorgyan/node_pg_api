import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { UserModel } from '../resources/user/user.model';
import { HttpException, Unauthorized, verifyToken } from '../utils';

export const authenticate = async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(HttpStatus.UNAUTHORIZED, Unauthorized));
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await verifyToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(HttpStatus.BAD_REQUEST, Unauthorized));
    }

    const user = await UserModel.query().findById(payload.id);

    if (!user) {
      return next(new HttpException(HttpStatus.UNAUTHORIZED, Unauthorized));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(HttpStatus.BAD_REQUEST, Unauthorized));
  }
};
