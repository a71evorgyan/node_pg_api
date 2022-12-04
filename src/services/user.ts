import { userDAO } from '../dao/user';

class UserService {
  getUser(id: string) {
    return userDAO.findById(id);
  }
}

export const userService = new UserService();
