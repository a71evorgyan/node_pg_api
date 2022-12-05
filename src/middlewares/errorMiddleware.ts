import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { SomethinWrong, HttpException } from '../utils';

export const errorMiddleware = ( error: HttpException, req: Request, res: Response, _next: NextFunction): void => {
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || SomethinWrong;
  res.status(status).send({
    status,
    message,
  });
};
