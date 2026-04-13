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

const updateCommentById = async (commentId, content) => {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
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

export { getCommentById, insertComment, updateCommentById, deleteCommentById };
