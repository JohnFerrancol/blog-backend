import { prisma } from '../config/prisma.js';

const insertComment = async (content, userId, postId) => {
  return await prisma.comment.create({
    data: {
      content: content,
      userId: userId,
      postId: postId,
    },
  });
};

export { insertComment };
