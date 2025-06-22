const authService = require('./auth.service');
const { users, posts } = require('../data/mock.data');

// Función helper para remover contraseña de usuario
const removePassword = (user) => {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Servicios para usuarios
const userService = {
  getAllUsers: () => {
    return users.map((user) => removePassword(user));
  },

  getUserById: (id) => {
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) return null;
    return removePassword(user);
  },

  createUser: (userData) => {
    // Este método ahora usa authService.register
    return authService.register(userData);
  },

  updateUser: (id, userData) => {
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...userData };
    return removePassword(users[userIndex]);
  },

  deleteUser: (id) => {
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  },
};

// Servicios para posts
const postService = {
  getAllPosts: () => posts,

  getPostById: (id) => {
    return posts.find((post) => post.id === parseInt(id));
  },

  getPostsByUserId: (userId) => {
    return posts.filter((post) => post.userId === parseInt(userId));
  },

  createPost: (postData) => {
    const newPost = {
      id: posts.length + 1,
      title: postData.title,
      content: postData.content,
      userId: parseInt(postData.userId),
    };
    posts.push(newPost);
    return newPost;
  },

  updatePost: (id, postData) => {
    const postIndex = posts.findIndex((post) => post.id === parseInt(id));
    if (postIndex === -1) return null;

    posts[postIndex] = { ...posts[postIndex], ...postData };
    return posts[postIndex];
  },

  deletePost: (id) => {
    const postIndex = posts.findIndex((post) => post.id === parseInt(id));
    if (postIndex === -1) return false;

    posts.splice(postIndex, 1);
    return true;
  },
};

// Servicios de utilidad
const utilityService = {
  simulateDelay: async (delay = 2000) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return {
      message: `Respuesta después de ${delay}ms`,
      timestamp: new Date().toISOString(),
    };
  },

  getHealthStatus: () => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      usersCount: users.length,
      postsCount: posts.length,
    };
  },

  simulateError: () => {
    throw new Error('Error simulado del servidor');
  },
};

module.exports = {
  userService,
  postService,
  utilityService,
};
