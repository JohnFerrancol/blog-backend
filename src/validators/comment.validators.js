import { body } from 'express-validator';

const newCommentValidator = [
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage('Comment must be between 5 and 100 characters'),
];

export default newCommentValidator;
