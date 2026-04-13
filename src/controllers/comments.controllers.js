import {
  getCommentById,
  deleteCommentById,
} from '../services/comments.services.js';

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

    res.status(200).json({
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

export { deleteComment };
