const express = require('express');
const postController = require('../controllers/post.controller');
const { postValidation } = require('../middlewares/validation.middleware');

const router = express.Router();

// Rutas para posts
router.get('/', postController.getAllPosts);
router.get('/:id', postValidation.validateId, postController.getPostById);
router.get(
  '/user/:userId',
  postValidation.validateUserId,
  postController.getPostsByUserId
);
router.post('/', postValidation.createUpdate, postController.createPost);
router.put(
  '/:id',
  postValidation.validateId,
  postValidation.createUpdate,
  postController.updatePost
);
router.delete('/:id', postValidation.validateId, postController.deletePost);

module.exports = router;
