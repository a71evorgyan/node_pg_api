import { User } from '../db/models/user';

class UserDAO {
  findById(id: string) {
    return User.query().findById(id);
  }
}

export const userDAO = new UserDAO();
