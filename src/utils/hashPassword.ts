import { hash } from 'bcrypt';

export const getHashedPassword = async (password: string) => {
  return hash(password, 10);
};
