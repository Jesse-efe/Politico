import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? process.env.testConnectionString : process.env.devConnectionString,
});

export default pool;
