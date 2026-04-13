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
    orderBy: {
      createdAt: 'desc',
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
        orderBy: {
          createdAt: 'desc',
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

const updatePost = async (postId, title, content) => {
  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      content: content,
    },
  });
};

export { getAllPosts, getPostById, insertPost, updatePost };
