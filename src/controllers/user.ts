
import { userService } from '../services/user';

class UserController {
  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.params.id);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

export const userController = new UserController();
