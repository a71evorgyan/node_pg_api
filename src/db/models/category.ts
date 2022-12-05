import { Model } from 'objection';

export class Category extends Model {
  static get tableName() {
    return 'category';
  }
}
