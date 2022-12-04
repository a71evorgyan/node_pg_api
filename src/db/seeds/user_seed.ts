import { Knex } from 'knex';
import { Role } from '../../types';
import { getHashedPassword } from '../../utils';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert([
    {
      id: 1,
      name: 'Member',
      login: 'member',
      password: await getHashedPassword('member'),
      role: Role.member
    },
    {
      id: 2,
      name: 'Admin',
      login: 'admin',
      password: await getHashedPassword('admin'),
      role: Role.admin
    },
    {
      id: 3,
      name: 'Moderator',
      login: 'moderator',
      password: await getHashedPassword('moderator'),
      role: Role.moderator
    }
  ]);
}
