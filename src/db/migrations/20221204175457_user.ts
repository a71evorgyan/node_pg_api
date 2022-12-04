import { Knex } from 'knex';
import { Role } from '../../types';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('login').notNullable().unique();
      table.string('password').notNullable();
      table.enu('role', Object.values(Role)).notNullable().defaultTo(Role.member);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('user');
}
