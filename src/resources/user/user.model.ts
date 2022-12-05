import { Model } from 'objection';

export class UserModel extends Model {
  static get tableName() {
    return 'user';
  }
}
