import pg from "pg";

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

const UserModel = {
  getAllUsers: (callback) => {
    query("SELECT * FROM users ORDER BY id", [], callback);
  },
  getUserById: (id, callback) => {
    query("SELECT * FROM users WHERE id = $1", [id], callback);
  },
  createUser: (name, email, callback) => {
    query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      callback
    );
  },
  updateUser: (id, name, email, callback) => {
    query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      callback
    );
  },
  deleteUser: (id, callback) => {
    query("DELETE FROM users WHERE id = $1", [id], callback);
  },
};

export default UserModel;
