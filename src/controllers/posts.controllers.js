import { getAllPosts } from '../services/posts.services.js';

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();

    res.json({
      status: 'success',
      message: 'Received all posts',
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { getPosts };
