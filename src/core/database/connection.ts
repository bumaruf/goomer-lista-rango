import { Pool } from 'pg';

const createConnection = async () => {
  const client = new Pool({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
  });

  return client;
};

export { createConnection };
