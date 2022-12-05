import { Knex } from 'knex';
import { Role } from '../../types';
import { generateHashedPassword } from '../../utils';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert([
    {
      id: '7127d60e-ad99-4bf3-971e-f1ad859ad883',
      name: 'Member',
      login: 'member',
      password: await generateHashedPassword('member'),
      role: Role.member
    },
    {
      id: '7127d60e-ad99-4bf3-971e-f1ad859dd8a3',
      name: 'Admin',
      login: 'admin',
      password: await generateHashedPassword('admin'),
      role: Role.admin
    },
    {
      id: '8127d60e-ad99-4bf3-971e-f1ad859ad8a3',
      name: 'Moderator',
      login: 'moderator',
      password: await generateHashedPassword('moderator'),
      role: Role.moderator
    }
  ]);
}
