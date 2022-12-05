import { Router, Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HttpException } from '../../utils';
import { validationBodyMiddleware, validationQueryMiddleware } from '../../middlewares/validationMiddlware';
import { IController, Role } from '../../types';
import { CategoryService } from './category.service';
import { CategoryRequest, CategoryIdRequest } from './category.validation';
import { authenticate } from '../../middlewares/authenticationMiddlware';
import { authorize } from '../../middlewares/authorizationMiddlware';

export class CategoryController implements IController {
  public path = '/categories';
  public router = Router();
  private CategoryService = new CategoryService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/create`, [validationBodyMiddleware(CategoryRequest), authenticate, authorize([Role.admin, Role.moderator])], this.createCategory);
    this.router.get(`${this.path}/list`, [authenticate, authorize([Role.admin, Role.moderator, Role.member])], this.getCategories);
    this.router.delete(`${this.path}`, [validationQueryMiddleware(CategoryIdRequest), authenticate, authorize([Role.admin])], this.deleteCategory);
  }

  private createCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, description } = req.body;

      const category = await this.CategoryService.createCategory(name, description);

      res.status(HttpStatus.CREATED).json({ category });
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };

  private getCategories = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

      const categories = await this.CategoryService.getCategories();

      res.status(HttpStatus.OK).send({ categories });
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };

  private deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      await this.CategoryService.deleteCategory(req.query.categoryId as string);

      return res.status(HttpStatus.NO_CONTENT).json();
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };
}
