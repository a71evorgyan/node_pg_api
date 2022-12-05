import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('category', (table) => {
      table.uuid('id').primary().unique().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable().unique();
      table.string('description').notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('category');
}
