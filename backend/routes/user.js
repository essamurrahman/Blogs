const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id',[
    body('password')
      .trim()
      .isLength({ min: 5 }),
  ], isAuth, userController.updateUser);

router.delete('/users/:id', isAuth, userController.deleteUser);

module.exports = router;
