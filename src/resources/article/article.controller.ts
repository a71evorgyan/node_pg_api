import { Router, Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { validationBodyMiddleware } from '../../middlewares/validationMiddlware';
import { authenticate } from '../../middlewares/authenticationMiddlware';
import { IController, Role } from '../../types';
import { CategoryRequest } from './article.validation';
import { authorize } from '../../middlewares/authorizationMiddlware';
import { HttpException } from '../../utils';
import { ArticleService } from './article.service';
import { upload } from '../../middlewares/uploadMiddlware';
import { forEach } from 'lodash';

export class ArticleController implements IController {
  public path = '/articles';
  public router = Router();
  private ArticleService = new ArticleService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/publish`, [authenticate, authorize([Role.moderator]), upload.array('file[]'), validationBodyMiddleware(CategoryRequest)], this.createArticle);
    this.router.get(`${this.path}/list`, [authenticate, authorize([Role.admin, Role.moderator, Role.member])], this.getArticles);
  }

  private createArticle = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, userId, categoryId, content } = req.body;

      const article = await this.ArticleService.createArticle(name, content, userId, categoryId, req.files as Express.Multer.File[]);

      res.status(HttpStatus.CREATED).json({ article });
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };

  private getArticles = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

      const articles = await this.ArticleService.getArticles();

      res.status(HttpStatus.OK).json({ articles });
    } catch (error) {
      next(new HttpException(HttpStatus.BAD_REQUEST, error.message));
    }
  };

}
