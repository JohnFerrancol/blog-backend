import {
  getAllPosts,
  getPostById,
  insertPost,
  updatePost,
  deletePostById,
} from '../services/posts.services.js';
import { insertComment } from '../services/comments.services.js';
import newCommentValidator from '../validators/comment.validators.js';
import newPostValidator from '../validators/posts.validators.js';
import { validationResult, matchedData } from 'express-validator';

// Middleware function to retrieve all posts in the application
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

// Middleware function to retrieve a single post
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

// Middleware function used to create a post and validate the inputs using express-validator
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

// Function to check if the post queried belongs to the user
const verifyPostOwnership = async (postId, user) => {
  const post = await getPostById(postId);

  if (!post) {
    return { error: 'NOT_FOUND' };
  }

  if (post.authorId !== user.id) {
    return { error: 'FORBIDDEN' };
  }

  return post;
};

// Middleware used to edit an existing post and validate the inputs through express-validator
const editPost = [
  newPostValidator,
  async (req, res) => {
    const user = req.user;
    const postId = Number(req.params.id);

    const result = await verifyPostOwnership(postId, user);

    if (result.error === 'NOT_FOUND') {
      return res.status(404).json({
        status: 'error',
        message: 'Comment not found',
      });
    }

    if (result.error === 'FORBIDDEN') {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden as post does not belong to you',
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

    const { title, content } = matchedData(req);

    try {
      const updatedPost = await updatePost(postId, title, content);

      res.status(201).json({
        status: 'success',
        message: 'Post updated successfully',
        comment: {
          id: updatedPost.id,
          title: updatedPost.title,
          content: updatedPost.content,
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

// Middleware used to delete an existing post
const deletePost = async (req, res) => {
  const user = req.user;
  const postId = Number(req.params.id);

  const result = await verifyPostOwnership(postId, user);

  if (result.error === 'NOT_FOUND') {
    return res.status(404).json({
      status: 'error',
      message: 'Comment not found',
    });
  }

  if (result.error === 'FORBIDDEN') {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden as post does not belong to you',
    });
  }

  try {
    await deletePostById(postId);

    res.json({
      status: 'success',
      message: `Post deleted successfully`,
      comment: {
        id: postId,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Middleware used to create a comment and validate the user inputs through express-validator
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

export {
  getPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
  createComment,
};
