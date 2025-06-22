const { postService } = require('../services/data.service');

// Controlador para posts
const postController = {
  // Obtener todos los posts
  getAllPosts: (req, res) => {
    try {
      const posts = postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener posts',
        message: error.message,
      });
    }
  },

  // Obtener post por ID
  getPostById: (req, res) => {
    try {
      const { id } = req.params;
      const post = postService.getPostById(id);

      if (!post) {
        return res.status(404).json({
          error: 'Post no encontrado',
          id: id,
        });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener post',
        message: error.message,
      });
    }
  },

  // Obtener posts por usuario
  getPostsByUserId: (req, res) => {
    try {
      const { userId } = req.params;
      const posts = postService.getPostsByUserId(userId);

      res.json(posts);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener posts del usuario',
        message: error.message,
      });
    }
  },

  // Crear nuevo post
  createPost: (req, res) => {
    try {
      const { title, content, userId } = req.body;
      const newPost = postService.createPost({ title, content, userId });

      res.status(201).json({
        message: 'Post creado exitosamente',
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear post',
        message: error.message,
      });
    }
  },

  // Actualizar post
  updatePost: (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, userId } = req.body;

      const updatedPost = postService.updatePost(id, {
        title,
        content,
        userId,
      });

      if (!updatedPost) {
        return res.status(404).json({
          error: 'Post no encontrado',
          id: id,
        });
      }

      res.json({
        message: 'Post actualizado exitosamente',
        post: updatedPost,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar post',
        message: error.message,
      });
    }
  },

  // Eliminar post
  deletePost: (req, res) => {
    try {
      const { id } = req.params;
      const deleted = postService.deletePost(id);

      if (!deleted) {
        return res.status(404).json({
          error: 'Post no encontrado',
          id: id,
        });
      }

      res.json({
        message: 'Post eliminado exitosamente',
        id: id,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar post',
        message: error.message,
      });
    }
  },
};

module.exports = postController;
