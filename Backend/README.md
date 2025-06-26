# Backend - Servidor Node.js + Express 🚀

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?style=for-the-badge&logo=express)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge)](https://opensource.org/licenses/ISC)

Servidor backend con Node.js y Express para ejemplos de conexiones API.

## ✨ Características

- Framework web **Express.js** para Node.js 🌐
- **Arquitectura modular** para una separación clara de responsabilidades 🏗️
- Sistema de **autenticación JWT** con tokens 🔒
- **Encriptación de contraseñas** con `bcrypt` para mayor seguridad 🛡️
- **Validaciones robustas** y profesionales con `express-validator` ✅
- Configuración de **CORS** para permitir peticiones desde el frontend ↔️
- Manejo de **variables de entorno** con `dotenv` 🤫
- **Auto-reload** durante el desarrollo con `nodemon` 🔄
- **API RESTful** con endpoints para usuarios, posts y animales 📦
- **Manejo de errores centralizado** con middlewares ⚙️

## 📂 Estructura del proyecto

```
Backend/
├── src/
│   ├── controllers/          # Controladores de la aplicación
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   ├── animal.controller.js
│   │   └── utility.controller.js
│   ├── data/                 # Datos mockeados
│   │   └── mock.data.js
│   ├── services/             # Lógica de negocio y datos
│   │   ├── auth.service.js
│   │   └── data.service.js
│   ├── routes/               # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   └── utility.routes.js
│   ├── middlewares/          # Middlewares personalizados
│   │   ├── auth.middleware.js
│   │   ├── logger.middleware.js
│   │   ├── notFound.middleware.js
│   │   └── validation.middleware.js
│   └── app.js                # Configuración principal de Express
├── index.js                  # Punto de entrada de la aplicación
├── package.json              # Dependencias y scripts
├── README.md                 # Documentación
└── .gitignore                # Archivos a ignorar
```

## 📜 Convención de nomenclatura

El proyecto utiliza la convención **dot notation** para una mejor organización:

- **Controllers**: `*.controller.js`
- **Services**: `*.service.js`
- **Routes**: `*.routes.js`
- **Middlewares**: `*.middleware.js`

Esta convención permite:

- 🎨 Agrupación visual de archivos relacionados
- 💡 Identificación rápida del tipo de archivo
- 🚀 Mejor escalabilidad del proyecto

## ⚙️ Instalación

```bash
npm install
```

## 🔑 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura
```

## 🛠️ Comandos disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con `nodemon`.
- `npm start` - Inicia el servidor en modo producción.

## 🔗 Endpoints disponibles

> 💡 **Tip para Insomnia:** En la raíz de la carpeta `Backend` encontrarás el archivo `insomnia.yml` para importar toda la colección de endpoints y `insomnia-login-script.md` que explica cómo configurar la obtención automática del token JWT al hacer login.

### Autenticación

| Método | Ruta                 | Descripción             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login`    | Iniciar sesión          |

#### Rutas Protegidas

| Método | Ruta                | Descripción                               |
| ------ | ------------------- | ----------------------------------------- |
| `GET`  | `/api/auth/profile` | Obtener perfil del usuario autenticado    |
| `GET`  | `/api/auth/users`   | Obtener todos los usuarios (autenticados) |

### Usuarios (Publicos)

| Método   | Ruta             | Descripción                |
| -------- | ---------------- | -------------------------- |
| `GET`    | `/api/users`     | Obtener todos los usuarios |
| `GET`    | `/api/users/:id` | Obtener usuario por ID     |
| `POST`   | `/api/users`     | Crear nuevo usuario        |
| `PUT`    | `/api/users/:id` | Actualizar usuario         |
| `DELETE` | `/api/users/:id` | Eliminar usuario           |

> Post, Put & Delete deberían estar protegidos con jwt, pero para este ejemplo no se realizo

### Posts (Publicos)

| Método   | Ruta                      | Descripción               |
| -------- | ------------------------- | ------------------------- |
| `GET`    | `/api/posts`              | Obtener todos los posts   |
| `GET`    | `/api/posts/:id`          | Obtener post por ID       |
| `GET`    | `/api/posts/user/:userId` | Obtener posts por usuario |
| `POST`   | `/api/posts`              | Crear nuevo post          |
| `PUT`    | `/api/posts/:id`          | Actualizar post           |
| `DELETE` | `/api/posts/:id`          | Eliminar post             |

> Post, Put & Delete deberían estar protegidos con jwt, pero para este ejemplo no se realizo

### Animales (Protegidos con JWT) 🐾

| Método   | Ruta                    | Descripción                |
| -------- | ----------------------- | -------------------------- |
| `GET`    | `/api/auth/animals`     | Obtener todos los animales |
| `GET`    | `/api/auth/animals/:id` | Obtener animal por ID      |
| `POST`   | `/api/auth/animals`     | Crear nuevo animal         |
| `PUT`    | `/api/auth/animals/:id` | Actualizar animal          |
| `DELETE` | `/api/auth/animals/:id` | Eliminar animal            |

#### Campos requeridos para animales

Al crear o actualizar un animal, se requieren los siguientes campos:

```json
{
  "nombre": "string",
  "especie": "string",
  "edad": "number",
  "color": "string"
}
```

#### Ejemplo de uso de endpoints de animales

```bash
# Obtener todos los animales (requiere autenticación)
curl -H "Authorization: Bearer TU_TOKEN_JWT" \
  http://localhost:3000/api/auth/animals

# Crear un nuevo animal (requiere autenticación)
curl -X POST http://localhost:3000/api/auth/animals \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Luna",
    "especie": "Perro",
    "edad": 3,
    "color": "Negro"
  }'

# Actualizar un animal (requiere autenticación)
curl -X PUT http://localhost:3000/api/auth/animals/1 \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Luna",
    "especie": "Perro",
    "edad": 4,
    "color": "Negro"
  }'

# Eliminar un animal (requiere autenticación)
curl -X DELETE http://localhost:3000/api/auth/animals/1 \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

### Utilidad y Testing

| Método | Ruta                   | Descripción                                                                |
| ------ | ---------------------- | -------------------------------------------------------------------------- |
| `GET`  | `/api`                 | Información del API y endpoints disponibles                                |
| `GET`  | `/api/health`          | Health check del servidor                                                  |
| `GET`  | `/api/slow?delay=3000` | Simular respuesta lenta (delay en ms)                                      |
| `GET`  | `/api/error`           | Simular error del servidor                                                 |
| `POST` | `/api/reset`           | **Resetear datos mockeados a valores originales (requiere autenticación)** |

#### Resetear datos mockeados

Este endpoint permite restaurar los usuarios y posts mockeados a sus valores originales. Solo está disponible para usuarios autenticados (requiere token JWT).

```bash
curl -X POST http://localhost:3000/api/reset \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

## 🔐 Autenticación JWT

### Registro de usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Usuario",
    "email": "nuevo@example.com",
    "password": "abc1234"
  }'
```

### Login de usuario

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "abc1234"
  }'
```

### Usar token en peticiones protegidas

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TU_TOKEN_JWT_AQUI"
```

## 👨‍👩‍👧‍👦 Usuarios de prueba

Los siguientes usuarios están pre-configurados con la contraseña `abc1234`:

- **Juan Pérez** - juan@example.com
- **María García** - maria@example.com
- **Carlos López** - carlos@example.com

## 🚀 Ejemplos de uso

### Obtener usuarios (requiere autenticación)

```bash
curl -H "Authorization: Bearer TU_TOKEN_JWT" \
  http://localhost:3000/api/users
```

### Crear post (requiere autenticación)

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -d '{
    "title": "Mi nuevo post",
    "content": "Contenido del post",
    "userId": 1
  }'
```

## 🏗️ Arquitectura

### Controllers

Manejan las peticiones HTTP y las respuestas. Cada controlador se encarga de un recurso específico.

### Services

Contienen la lógica de negocio y el acceso a datos. Los servicios son reutilizables y no dependen de Express.

### Routes

Definen los endpoints de la API y conectan las rutas con los controladores correspondientes.

### Middlewares

Funciones que se ejecutan entre la petición y la respuesta:

- **auth**: Verificación de tokens JWT
- **logger**: Middleware de registro
- **notFound**: Manejo de rutas no encontradas
- **validation**: Validación de datos de entrada

## 💻 Desarrollo

El servidor incluye:

- CORS configurado para desarrollo
- Middleware para parsing de JSON
- Logging de peticiones
- Manejo de errores global
- Validaciones de datos
- Autenticación JWT
- Encriptación de contraseñas con `bcrypt`
- Logs informativos en consola

## ✅ Validaciones

El proyecto utiliza **express-validator** para validaciones robustas y profesionales:

### Validaciones de autenticación

- **Registro**: Nombre (2-50 chars), email válido, contraseña (4-100 chars)
- **Login**: Email válido, contraseña requerida

### Validaciones de usuarios

- **Crear/Actualizar**: Nombre opcional (2-50 chars), email opcional válido
- **ID**: Número entero positivo

### Validaciones de posts

- **Crear/Actualizar**: Título (3-200 chars), contenido (10-2000 chars), userId entero positivo
- **ID**: Número entero positivo
- **userId**: Número entero positivo

### Ejemplo de respuesta de error de validación

```json
{
  "error": "Error de validación",
  "details": [
    {
      "field": "email",
      "message": "Debe proporcionar un email válido",
      "value": "email_invalido"
    }
  ]
}
```
