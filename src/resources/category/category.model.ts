import { Model } from 'objection';

export class CategoryModel extends Model {
  static get tableName() {
    return 'category';
  }
}
