import { Request, Response, NextFunction, RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';
import { Role } from '../types';
import { Forbidden, HttpException } from '../utils';

export const authorize = (permittedRoles: Role[]) => {
  return (req: any, res: Response, next: NextFunction): any => {
    const { user } = req;
    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      next(new HttpException(HttpStatus.FORBIDDEN, Forbidden));
    }
  };
};
