import { Role } from 'src/types';

export interface IUser {
  id: string;
  login: string;
  name: string;
  password: string;
  role: Role;
}
