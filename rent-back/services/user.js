const { query } = require('../config/db');
const bcrypt = require('bcryptjs');

const UserService = {
  createUser: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(bcrypt.hash('123456', 10))
    return query(
      'INSERT INTO client_auth (fio, email, password) VALUES ($1, $2, $3) RETURNING id, fio, email',
      [username, email, hashedPassword]
    );
 
  },
  findByEmail: async (email) => {
    return query('SELECT * FROM client_auth WHERE email = $1', [email]);
  },

  // Другие методы работы с пользователем...
};

module.exports = UserService;