const authService = require('./auth.service');
const {
  users,
  posts,
  originalUsers,
  originalPosts,
  animals,
  originalAnimals,
} = require('../data/mock.data');

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

// Servicios para animales
const animalService = {
  getAll: () => animals,
  getById: (id) => animals.find((a) => a.id === parseInt(id)),
  create: (data) => {
    const newAnimal = {
      id: animals.length ? Math.max(...animals.map((a) => a.id)) + 1 : 1,
      ...data,
    };
    animals.push(newAnimal);
    return newAnimal;
  },
  update: (id, data) => {
    const idx = animals.findIndex((a) => a.id === parseInt(id));
    if (idx === -1) return null;
    animals[idx] = { ...animals[idx], ...data };
    return animals[idx];
  },
  delete: (id) => {
    const idx = animals.findIndex((a) => a.id === parseInt(id));
    if (idx === -1) return false;
    animals.splice(idx, 1);
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

  /**
   * Restaura los arrays de usuarios, posts y animales a sus valores originales mockeados.
   *
   * Vacía los arrays actuales y los rellena con copias profundas de los datos originales,
   * permitiendo que la aplicación vuelva a su estado inicial sin reiniciar el servidor.
   *
   * @returns {Object} Mensaje de éxito y cantidad de usuarios, posts y animales restaurados.
   */
  resetMockData: () => {
    users.length = 0; // Vacía el array de usuarios
    posts.length = 0; // Vacía el array de posts
    animals.length = 0; // Vacía el array de animales
    originalUsers.forEach((u) => users.push(JSON.parse(JSON.stringify(u)))); // Rellena el array de usuarios con copias profundas de los datos originales
    originalPosts.forEach((p) => posts.push(JSON.parse(JSON.stringify(p)))); // Rellena el array de posts con copias profundas de los datos originales
    originalAnimals.forEach((a) => animals.push(JSON.parse(JSON.stringify(a)))); // Rellena el array de animales con copias profundas de los datos originales
    return {
      message: 'Datos mockeados reseteados a los valores originales',
      usersCount: users.length,
      postsCount: posts.length,
      animalsCount: animals.length,
    };
  },
};

module.exports = {
  userService,
  postService,
  utilityService,
  animalService,
};
