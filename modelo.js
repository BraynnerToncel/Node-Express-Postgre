// modelo.js
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "apirest",
  password: "123456789",
  port: 5432,
});

const query = async (text, params, callback) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    callback(null, result);
  } catch (error) {
    callback(error, null);
  } finally {
    client.release();
  }
};

export default query;
