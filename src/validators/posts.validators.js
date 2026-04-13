import { body } from 'express-validator';

const newPostValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 5, max: 80 })
    .withMessage('Title must be between 5 and 80 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Content must be between 20 and 1000 characters'),
];

export default newPostValidator;
