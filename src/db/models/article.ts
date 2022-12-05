
import { Model } from 'objection';

export class Article extends Model {
  static get tableName() {
    return 'article';
  }
}
