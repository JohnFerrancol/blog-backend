import { insertUser } from '../services/auth.services.js';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';
import newUserValidator from '../validators/auth.validators.js';
import { matchedData, validationResult } from 'express-validator';

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const getUser = (req, res) => {
  res.json({
    status: 'sucess',
    message: 'User information retrieved successfully',
    user: {
      id: req.user.id,
      username: req.user.username,
    },
  });
};

const registerUser = [
  newUserValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid user inputs given',
          errorArray: errors.array(),
        });
      }

      const { username, password } = matchedData(req);
      const newUser = await insertUser(username, password);

      const token = generateToken(newUser);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
];

const loginUser = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid username or password',
      });
    }

    const token = generateToken(user);

    res.json({
      status: 'success',
      message: 'User logged in successfully',
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    });
  })(req, res, next);
};

export { getUser, registerUser, loginUser };
