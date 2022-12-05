import { ArticleModel } from "./article.mode";

export class ArticleService {
  private articleModel = ArticleModel;

  public async createArticle(name: string, content: string, userId: string, categoryId: string): Promise<ArticleModel> {
    try {
      const article = await this.articleModel.query().insert({
        name: name.toLocaleLowerCase(),
        content,
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