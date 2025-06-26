// Este archivo define los datos mockeados de usuarios y posts para la aplicación.
// Se utiliza JSON.parse(JSON.stringify(...)) para crear una copia profunda de los datos originales,
// evitando que los cambios en tiempo de ejecución afecten la versión original.
// Así, es posible restaurar los datos mockeados a su estado inicial cuando se requiera.

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

const originalUsers = JSON.parse(JSON.stringify(users));

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

const originalPosts = JSON.parse(JSON.stringify(posts));

// Animales mockeados
const animals = [
  {
    id: 1,
    nombre: 'Firulais',
    especie: 'Perro',
    edad: 5,
    color: 'Marrón',
  },
  {
    id: 2,
    nombre: 'Misu',
    especie: 'Gato',
    edad: 3,
    color: 'Negro',
  },
  {
    id: 3,
    nombre: 'Lola',
    especie: 'Conejo',
    edad: 2,
    color: 'Blanco',
  },
];

const originalAnimals = JSON.parse(JSON.stringify(animals));

module.exports = {
  users,
  posts,
  originalUsers,
  originalPosts,
  animals,
  originalAnimals,
};
