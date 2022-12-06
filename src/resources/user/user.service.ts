import { generateHashedPassword, InvalidCredentials, UserLoginExists, UserNotFound, validateHashedPassword } from '../../utils';
import { createToken } from '../../utils';
import { UserModel } from './user.model';

export class UserService {
  private userModel = UserModel;

  public async signUp(name: string, login: string, password: string): Promise<string | Error> {
    try {
      const existingUser = await this.userModel.query().findOne({ login });

      if (existingUser)
        throw new Error(UserLoginExists);

      const hashedPassword = generateHashedPassword(password);
      const user = await this.userModel.query().insert({
        name,
        login,
        password: await hashedPassword
      });

      const accessToken = createToken(user);
      return accessToken;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async signIn(login: string, password: string): Promise<string | Error> {
    try {
      const user: any = await this.userModel.query().findOne({ login });

      if (!user) {
        throw new Error(InvalidCredentials);
      }

      const isValidPassword = await validateHashedPassword(password, user.password);

      if (isValidPassword) {
        return createToken(user);
      } else {
        throw new Error(InvalidCredentials);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
