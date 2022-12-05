import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('article', (table) => {
      table.uuid('id').primary().unique().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable(),
      table.string('content').notNullable();
      table.uuid('userId').notNullable().references('id').inTable('user');
      table.uuid('categoryId').notNullable().references('id').inTable('category');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('article');
}
