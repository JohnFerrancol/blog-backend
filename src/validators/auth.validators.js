import { body } from 'express-validator';
import { getUserByName } from '../services/auth.services.js';

const newUserValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage('Username must be between 6 and 30 characters')
    .bail()
    .custom(async (value) => {
      // Custom validator to ensure that the username has not been used before
      const user = await getUserByName(value);

      if (user) {
        throw new Error('Username is already in use');
      }

      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .bail()
    .matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      'Password must include at least one letter, one number, and one special character'
    ),
  body('confirm-password')
    .notEmpty()
    .withMessage('Please confirm your password')
    .bail()
    .custom((value, { req }) => {
      // Custom validator to enusre the confirm-password and the password fields match
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }

      return true;
    }),
];

export default newUserValidator;
