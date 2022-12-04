import knex from 'knex';
import { Model } from 'objection';
import { config } from './knexfile';

export function setupDb() {
  const db = knex(config.development);
  Model.knex(db);
}
