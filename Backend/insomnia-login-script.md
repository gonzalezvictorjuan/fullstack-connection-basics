# 🔐 insomnia-login-script

Script para Insomnia que guarda automáticamente el token JWT de la respuesta de un endpoint de login en el entorno activo.

## ✨ ¿Qué hace?

Este script se coloca en la sección **_After Response_** del endpoint de login en Insomnia. Su función es detectar si el cuerpo de la respuesta contiene un campo \`token\`, y en ese caso lo guarda como variable de entorno con el nombre \`jwt_token\`.

## 🧠 ¿Cómo se usa?

1. Abre tu petición de login en Insomnia.
2. Haz clic en la pestaña ⚙️ **"Request Settings"**.
3. Ve a la sección **"Response" → "After Response"**.
4. Pega el siguiente script:

```js
const jsonBody = insomnia.response.json();

if (jsonBody.token) {
  insomnia.environment.set('jwt_token', jsonBody.token);
  console.log('✅ Token guardado como jwt_token');
} else {
  console.warn('⚠️ No se encontró token en la respuesta');
}
```

5. Asegúrate de tener configurado un entorno activo en Insomnia.

## ⚠️ Advertencias

- El script asume que el token viene en la propiedad \`token\` del cuerpo JSON.
- Si el backend responde con otro formato, deberás adaptar el script.

## 🧪 Recomendación

Puedes usar la variable guardada en otros endpoints agregando el header de autorización automáticamente:

```
Authorization: Bearer {{ jwt_token }}
```
