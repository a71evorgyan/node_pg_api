import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('article', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable(),
      table.string('content').notNullable();
      table.integer('userId').notNullable().references('id').inTable('user');
      table.integer('categoryId').notNullable().references('id').inTable('category');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('article');
}
