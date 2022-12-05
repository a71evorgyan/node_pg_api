import { Router, Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HttpException } from '../../utils';
import { IController } from '../../types';
import { UserService } from './user.service';
import { validationBodyMiddleware } from '../../middlewares/validationMiddlware';
import { signUpRequest, signInRequest } from './user.validation';

export class UserController implements IController {
  public path = '/users';
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/signup`, validationBodyMiddleware(signUpRequest), this.signUp);
    this.router.post(`${this.path}/signin`, validationBodyMiddleware(signInRequest), this.signIn);
  }

  private signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, login, password } = req.body;

      const token = await this.UserService.signUp(name, login, password);

      res.status(HttpStatus.CREATED).json({ token });
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };

  private signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { login, password } = req.body;

      const token = await this.UserService.signIn(login, password);

      res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };
}
