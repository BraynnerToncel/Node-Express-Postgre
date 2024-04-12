import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "apirest",
  password: "123456789",
  port: 5432,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

export default query;
