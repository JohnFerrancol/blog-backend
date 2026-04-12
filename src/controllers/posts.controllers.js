import { getAllPosts, getPostById } from '../services/posts.services.js';

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

const getSinglePost = async (req, res) => {
  try {
    const post = await getPostById(Number(req.params.id));

    res.json({
      status: 'success',
      message: `Received Post: ${post.id}`,
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { getPosts, getSinglePost };
