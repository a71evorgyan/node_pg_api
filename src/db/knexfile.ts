
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });
import type { Knex } from 'knex';
import { POSTGREDB_NAME, POSTGREDB_PASSWORD, POSTGREDB_USER } from '../utils';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: POSTGREDB_NAME,
      user: POSTGREDB_USER,
      password: POSTGREDB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
  }
};
export default config;
