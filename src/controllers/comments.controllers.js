import {
  getCommentById,
  deleteCommentById,
  updateCommentById,
} from '../services/comments.services.js';
import newCommentValidator from '../validators/comment.validators.js';
import { validationResult, matchedData } from 'express-validator';

// Function to check if the comment queried belongs to the user
const verifyCommentOwnership = async (commentId, user) => {
  const comment = await getCommentById(commentId);

  if (!comment) {
    return { error: 'NOT_FOUND' };
  }

  if (comment.userId !== user.id) {
    return { error: 'FORBIDDEN' };
  }

  return comment;
};

// Middleware function used to update the existing comment and validate the inputs through express-validator
const updateComment = [
  newCommentValidator,
  async (req, res) => {
    const user = req.user;
    const commentId = Number(req.params.id);

    const result = await verifyCommentOwnership(commentId, user);

    if (result.error === 'NOT_FOUND') {
      return res.status(404).json({
        status: 'error',
        message: 'Comment not found',
      });
    }

    if (result.error === 'FORBIDDEN') {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden as comment does not belong to you',
      });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user inputs given',
        errorArray: errors.array(),
      });
    }

    try {
      const { comment } = matchedData(req);
      const updatedComment = await updateCommentById(commentId, comment);

      res.status(201).json({
        status: 'success',
        message: 'Comment updated successfully',
        comment: {
          id: updatedComment.id,
          content: updatedComment.content,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
];

// Middleware function used to delete an existing comment
const deleteComment = async (req, res) => {
  const commentId = Number(req.params.id);
  const user = req.user;
  const result = await verifyCommentOwnership(commentId, user);

  if (result.error === 'NOT_FOUND') {
    return res.status(404).json({
      status: 'error',
      message: 'Comment not found',
    });
  }

  if (result.error === 'FORBIDDEN') {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden as comment does not belong to you',
    });
  }

  try {
    await deleteCommentById(commentId);

    res.json({
      status: 'success',
      message: `Comment deleted successfully`,
      comment: {
        id: commentId,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { updateComment, deleteComment };
