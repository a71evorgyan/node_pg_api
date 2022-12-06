import { forEach } from 'lodash';
import { convertToHTML } from '../../utils';
import { ArticleModel } from './article.model';

export class ArticleService {
  private articleModel = ArticleModel;

  public async createArticle(name: string, content: string, userId: string, categoryId: string, files: Express.Multer.File[]): Promise<ArticleModel> {
    try {
      const contentImages = {};
      if (files) {
        forEach(files, (file: Express.Multer.File) => {
          contentImages[`%${file.originalname.match(/^(.*?)\./)[1]}%`] = `<img src=${file.path}>`;
        })
      }

      const htmlContent = convertToHTML(content, contentImages);

      const article = await this.articleModel.query().insert({
        name: name.toLocaleLowerCase(),
        content: htmlContent,
        userId,
        categoryId
      });

      return article;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getArticles(): Promise<any> {
    try {
      const articles = await this.articleModel.query()
        .select('article.*', 'user.name as author', 'category.name as category')
        .leftJoin('user', 'article.userId', 'user.id')
        .leftJoin('category', 'article.categoryId', 'category.id');

      return articles;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
