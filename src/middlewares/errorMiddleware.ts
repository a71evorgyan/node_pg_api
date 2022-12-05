import { Request, Response, NextFunction } from 'express';
import { SomethinWrong, HttpException } from '../utils';

export function errorMiddleware( error: HttpException, req: Request, res: Response, _next: NextFunction): void {
  const status = error.status || 500;
  const message = error.message || SomethinWrong;
  res.status(status).send({
    status,
    message,
  });
}
