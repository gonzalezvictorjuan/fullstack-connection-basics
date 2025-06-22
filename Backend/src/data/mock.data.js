// Datos mockeados para la aplicación

// Usuarios mockeados con contraseña encriptada >> "abc1234"
const users = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: '$2b$10$/xUoKshsfQ7h7cXWRGDdRep/bmmCh..a75BFl8.3hcx40.zscqNLu',
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    password: '$2b$10$/xUoKshsfQ7h7cXWRGDdRep/bmmCh..a75BFl8.3hcx40.zscqNLu',
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@example.com',
    password: '$2b$10$/xUoKshsfQ7h7cXWRGDdRep/bmmCh..a75BFl8.3hcx40.zscqNLu',
  },
];

// Posts mockeados
const posts = [
  {
    id: 1,
    title: 'Mi primer post',
    content: 'Contenido del primer post',
    userId: 1,
  },
  {
    id: 2,
    title: 'Segundo post',
    content: 'Contenido del segundo post',
    userId: 2,
  },
  {
    id: 3,
    title: 'Tercer post',
    content: 'Contenido del tercer post',
    userId: 1,
  },
];

module.exports = {
  users,
  posts,
};
