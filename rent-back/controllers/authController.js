const jwt = require('jsonwebtoken');
const UserService = require('../services/user');
const { validationResult } = require('express-validator');
const config = require('../config');

const AuthController = {
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Проверка существования пользователя
      const existingUser = await UserService.findByEmail(email);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Создание пользователя
      const newUser = await UserService.createUser({ username, email, password });

      // Генерация JWT
      const token = jwt.sign(
        { userId: newUser.rows[0].id },
        config.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        user: newUser.rows[0],
        token
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      // ... аналогично регистрации ...
    } catch (error) {
      next(error);
    }
  }
};

module.exports = AuthController;