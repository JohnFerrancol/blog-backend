import {
  getAllPosts,
  getPostById,
  insertPost,
} from '../services/posts.services.js';
import { insertComment } from '../services/comments.services.js';
import newCommentValidator from '../validators/comment.validators.js';
import newPostValidator from '../validators/posts.validators.js';
import { validationResult, matchedData } from 'express-validator';

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

const createPost = [
  newPostValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user inputs given',
        errorArray: errors.array(),
      });
    }

    const user = req.user;
    const { title, content } = matchedData(req);

    try {
      const newPost = await insertPost(title, content, user.id);

      res.status(201).json({
        status: 'success',
        message: 'Post added successfully',
        comment: {
          id: newPost.id,
          title: newPost.title,
          content: newPost.content,
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

const createComment = [
  newCommentValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user inputs given',
        errorArray: errors.array(),
      });
    }

    const user = req.user;
    const postId = Number(req.params.id);
    const { comment } = matchedData(req);

    try {
      const newComment = await insertComment(comment, user.id, postId);

      res.status(201).json({
        status: 'success',
        message: 'Comment added successfully',
        comment: {
          id: newComment.id,
          content: newComment.content,
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

export { getPosts, getSinglePost, createPost, createComment };
