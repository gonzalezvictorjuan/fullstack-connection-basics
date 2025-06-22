const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data/mock.data');

// Clave secreta para JWT (en producción debería estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura';

const authService = {
  // Registrar nuevo usuario
  register: async (userData) => {
    const { name, email, password } = userData;

    // Verificar si el email ya existe
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Login de usuario
  login: async (email, password) => {
    // Buscar usuario por email
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retornar usuario sin contraseña y token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  },

  // Verificar token JWT
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  },
};

module.exports = authService;
