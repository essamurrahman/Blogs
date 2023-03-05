const express = require('express');
const { body } = require('express-validator/check');

const commentController = require('../controllers/comment');
const blogController = require('../controllers/blog');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', isAuth, blogController.getPosts);
router.get('/fetchAllPosts', blogController.getPosts);


// POST /feed/post
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  blogController.createPost
);

router.get('/post/:postId', isAuth, blogController.getPost);
router.get('/posts/user/:id', isAuth, blogController.getPostsByUser);
router.get('/posts/comments/:id', isAuth, blogController.getComments);


router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  blogController.updatePost
);

router.delete('/post/:postId', isAuth, blogController.deletePost);


//comments

// CRUD (Create, Read, Update, Delete)

router.post('/post/:id/comment', isAuth, commentController.createComment);
router.get('/posts/:id/comments', blogController.getComments);
router.get('/posts/:postid/comments/:id', isAuth, commentController.getCommentsById);
router.put('/posts/:postId/comments/:id', isAuth, commentController.updateComment);
router.delete('/posts/:postId/comments/:id', isAuth, commentController.deleteComment);

module.exports = router;
