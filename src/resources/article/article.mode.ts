import { Model } from 'objection';

export class ArticleModel extends Model {
  static get tableName() {
    return 'article';
  }
}
