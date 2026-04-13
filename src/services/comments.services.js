import { prisma } from '../config/prisma.js';

const getCommentById = async (commentId) => {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
};

const insertComment = async (content, userId, postId) => {
  return await prisma.comment.create({
    data: {
      content: content,
      userId: userId,
      postId: postId,
    },
  });
};

const deleteCommentById = async (commentId) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

export { getCommentById, insertComment, deleteCommentById };
