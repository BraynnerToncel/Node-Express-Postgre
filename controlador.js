import UserModel from "./modelo.js";

const getUsers = (request, response) => {
  UserModel.getAllUsers((error, results) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  UserModel.getUserById(id, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    }
    if (!results.rows.length) {
      response.status(404).json({ error: "User not found" });
    }
    response.status(200).json(results.rows[0]);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  UserModel.createUser(name, email, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  UserModel.updateUser(id, name, email, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    }
    response.status(200).send(`User modified with ID: ${id}`);
  });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  UserModel.deleteUser(id, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Database connection error" });
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
