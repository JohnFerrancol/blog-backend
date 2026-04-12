import { prisma } from '../config/prisma.js';

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const getPostById = async (postId) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const insertPost = async (title, content, authorId) => {
  return await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
    },
  });
};

export { getAllPosts, getPostById, insertPost };
