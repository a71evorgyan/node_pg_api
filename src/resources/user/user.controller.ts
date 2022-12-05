import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../../utils';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { IController } from '../../types';
import { UserService } from './user.service';
import validate from './user.validation';

export class UserController implements IController {
  public path = '/users';
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/signup`, validationMiddleware(validate.signUp), this.signUp);
    this.router.post(`${this.path}/signin`, validationMiddleware(validate.signIn), this.signIn);
  }

  private signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, login, password } = req.body;

      const token = await this.UserService.signUp(name, login, password);

      res.status(201).json({ token });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  private signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { login, password } = req.body;

      const token = await this.UserService.signIn(login, password);

      res.status(200).json({ token });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };
}
