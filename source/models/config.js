import { Pool } from 'pg';

require('dotenv').config();

const pool = new Pool({
  // connectionString: process.env.devConnectionString,
  connectionString: process.env.testConnectionString,
});

export default pool;
