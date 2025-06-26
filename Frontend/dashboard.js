console.log('Dashboard cargado');

const API_URL = 'http://localhost:3000/api';

// --- Declaración de elementos del DOM ---
const loginSection = document.getElementById('loginSection');
const animalSection = document.getElementById('animalSection');
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginResponseMessage = document.getElementById('loginResponseMessage');
const logoutButton = document.getElementById('logoutButton');
const animalsTableBody = document.getElementById('postsTableBody');
const animalsMessage = document.getElementById('postsMessage');
const newAnimalButton = document.getElementById('newPostButton');
const newAnimalModal = document.getElementById('newPostModal');
const newAnimalForm = document.getElementById('newPostForm');
const newAnimalNombre = document.getElementById('newPostTitle');
const newAnimalEspecie = document.getElementById('newPostContent');
const newAnimalEdad = document.getElementById('newPostUserId');
const newAnimalColor = document.getElementById('newPostColor');
const newAnimalMessage = document.getElementById('newPostMessage');
let bsNewAnimalModal = null;

let token = localStorage.getItem('dashboard_token') || null;
console.log('Token: ', token);

// Mostrar animales si ya hay token
if (token) {
  mostrarAnimales();
}

if (loginForm && loginButton) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;
    if (!email || !password) {
      loginResponseMessage.textContent = 'Completa ambos campos.';
      loginResponseMessage.style.color = 'orange';
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Error en login');
      }
      token = result.token;
      localStorage.setItem('dashboard_token', token);
      loginResponseMessage.textContent = '¡Login exitoso!';
      loginResponseMessage.style.color = 'green';
      mostrarAnimales();
    } catch (error) {
      loginResponseMessage.textContent = error.message || 'Error en login.';
      loginResponseMessage.style.color = 'red';
    }
  });
}

function mostrarLoginSection() {
  loginSection.style.display = 'block';
  animalSection.style.display = 'none';
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('dashboard_token');
    token = null;
    mostrarLoginSection();
    animalsTableBody.innerHTML = '';
    animalsMessage.textContent = '';
    // Limpiar el mensaje de respuesta del login
    if (loginResponseMessage) {
      loginResponseMessage.textContent = '';
    }
  });
}

// --- ANIMALES: CRUD ---
const newPostButton = document.getElementById('newPostButton');
const newPostModal = document.getElementById('newPostModal');
const newPostForm = document.getElementById('newPostForm');
const newPostTitle = document.getElementById('newPostTitle');
const newPostContent = document.getElementById('newPostContent');
const newPostUserId = document.getElementById('newPostUserId');
const newPostMessage = document.getElementById('newPostMessage');
let bsNewPostModal = null;

// Adaptar modal para animales
if (newAnimalModal) {
  bsNewAnimalModal = new bootstrap.Modal(newAnimalModal);
  // Cambiar labels si es necesario
  document.getElementById('newPostModalLabel').textContent =
    'Crear Nuevo Animal';
  newAnimalNombre.placeholder = 'Nombre';
  newAnimalEspecie.placeholder = 'Especie';
  newAnimalEdad.placeholder = 'Edad';
  // Agregar input para color si no existe
  if (!newAnimalColor) {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'mb-3';
    colorDiv.innerHTML = `<label for="newPostColor" class="form-label">Color</label><input type="text" class="form-control" id="newPostColor" required maxlength="30" />`;
    newAnimalForm.insertBefore(
      colorDiv,
      newAnimalForm.querySelector('.modal-footer')
    );
  }
}

// Utilidad para manejar 401 en cualquier fetch protegido
function handle401(response) {
  if (response.status === 401) {
    localStorage.removeItem('dashboard_token');
    token = null;
    mostrarLoginSection();
    animalsMessage.textContent = '';
    return true;
  }
  return false;
}

function mostrarAnimales() {
  loginSection.style.display = 'none';
  animalSection.style.display = 'block';
  animalsTableBody.innerHTML = '';
  animalsMessage.textContent = '';
  fetch(`${API_URL}/auth/animals`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((r) => {
      if (handle401(r)) return Promise.reject('No autorizado');
      return r.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        animalsMessage.textContent = 'No hay animales para mostrar.';
        return;
      }
      data.forEach((animal) => agregarFilaAnimal(animal));
    })
    .catch((err) => {
      if (err !== 'No autorizado') {
        animalsMessage.textContent = 'Error al cargar animales.';
        animalsMessage.style.color = 'red';
      }
    });
}

function agregarFilaAnimal(animal) {
  const tr = document.createElement('tr');
  tr.classList.add('row-fade-enter');
  setTimeout(() => tr.classList.add('row-fade-enter-active'), 10);
  tr.innerHTML = `
    <td>${animal.id}</td>
    <td><input type="text" value="${animal.nombre}" class="form-control form-control-sm" disabled /></td>
    <td><input type="text" value="${animal.especie}" class="form-control form-control-sm" disabled /></td>
    <td><input type="number" value="${animal.edad}" class="form-control form-control-sm" min="0" disabled /></td>
    <td><input type="text" value="${animal.color}" class="form-control form-control-sm" disabled /></td>
    <td><div class="actions-wrapper d-flex gap-1">
      <button class="btn btn-editar-custom btn-sm editar-btn fade-transition fade-show" title="Editar"><span aria-label="Editar" role="img">✏️</span></button>
      <button class="btn btn-success btn-sm guardar-btn fade-transition fade-hide" title="Guardar"><span aria-label="Guardar" role="img">💾</span></button>
      <button class="btn btn-cancelar-custom btn-sm cancelar-btn fade-transition fade-hide" title="Cancelar"><span aria-label="Cancelar" role="img">🚫</span></button>
      <button class="btn btn-danger btn-sm eliminar-btn fade-transition fade-show" title="Eliminar"><span aria-label="Eliminar" role="img">🗑️</span></button>
    </div></td>
  `;
  const editarBtn = tr.querySelector('.editar-btn');
  const guardarBtn = tr.querySelector('.guardar-btn');
  const cancelarBtn = tr.querySelector('.cancelar-btn');
  const eliminarBtn = tr.querySelector('.eliminar-btn');
  const inputs = [
    tr.children[1].querySelector('input'),
    tr.children[2].querySelector('input'),
    tr.children[3].querySelector('input'),
    tr.children[4].querySelector('input'),
  ];
  const valoresOriginales = inputs.map((i) => i.value);

  editarBtn.addEventListener('click', () => {
    inputs.forEach((input) => (input.disabled = false));
    editarBtn.classList.replace('fade-show', 'fade-hide');
    guardarBtn.classList.replace('fade-hide', 'fade-show');
    cancelarBtn.classList.replace('fade-hide', 'fade-show');
    eliminarBtn.classList.replace('fade-show', 'fade-hide');
    tr.classList.add('row-editing');
  });
  guardarBtn.addEventListener('click', async () => {
    const [nombre, especie, edad, color] = inputs.map((i) => i.value);
    try {
      const response = await fetch(`${API_URL}/auth/animals/${animal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, especie, edad, color }),
      });
      if (handle401(response)) return;
      if (!response.ok) throw new Error('No se pudo actualizar el animal.');
      animalsMessage.textContent = '¡Animal actualizado!';
      animalsMessage.style.color = 'green';
      setTimeout(() => (animalsMessage.textContent = ''), 2000);
      inputs.forEach((input) => (input.disabled = true));
      editarBtn.classList.replace('fade-hide', 'fade-show');
      guardarBtn.classList.replace('fade-show', 'fade-hide');
      cancelarBtn.classList.replace('fade-show', 'fade-hide');
      eliminarBtn.classList.replace('fade-hide', 'fade-show');
      valoresOriginales.forEach(
        (v, i) => (valoresOriginales[i] = inputs[i].value)
      );
      tr.classList.remove('row-editing');
    } catch (error) {
      animalsMessage.textContent = error.message || 'Error al actualizar.';
      animalsMessage.style.color = 'red';
    }
  });
  cancelarBtn.addEventListener('click', () => {
    inputs.forEach((input, i) => {
      input.value = valoresOriginales[i];
      input.disabled = true;
    });
    editarBtn.classList.replace('fade-hide', 'fade-show');
    guardarBtn.classList.replace('fade-show', 'fade-hide');
    cancelarBtn.classList.replace('fade-show', 'fade-hide');
    eliminarBtn.classList.replace('fade-hide', 'fade-show');
    tr.classList.remove('row-editing');
  });
  eliminarBtn.addEventListener('click', async () => {
    if (!confirm('¿Seguro que deseas eliminar este animal?')) return;
    try {
      tr.classList.add('row-fade-exit');
      setTimeout(() => tr.classList.add('row-fade-exit-active'), 10);
      setTimeout(() => tr.remove(), 400);
      const response = await fetch(`${API_URL}/auth/animals/${animal.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (handle401(response)) return;
      if (!response.ok) throw new Error('No se pudo eliminar el animal.');
      animalsMessage.textContent = '¡Animal eliminado!';
      animalsMessage.style.color = 'green';
      setTimeout(() => (animalsMessage.textContent = ''), 2000);
    } catch (error) {
      animalsMessage.textContent = error.message || 'Error al eliminar.';
      animalsMessage.style.color = 'red';
    }
  });
  animalsTableBody.appendChild(tr);
}

if (newAnimalButton && bsNewAnimalModal) {
  newAnimalButton.addEventListener('click', (e) => {
    e.preventDefault();
    newAnimalForm.reset();
    newAnimalMessage.textContent = '';
    bsNewAnimalModal.show();
  });
}
if (newAnimalForm) {
  newAnimalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = newAnimalNombre.value.trim();
    const especie = newAnimalEspecie.value.trim();
    const edad = newAnimalEdad.value.trim();
    const color = document.getElementById('newPostColor').value.trim();
    if (!nombre || !especie || !edad || !color) {
      newAnimalMessage.textContent = 'Completa todos los campos.';
      newAnimalMessage.style.color = 'orange';
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/animals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, especie, edad, color }),
      });
      if (handle401(response)) return;
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || 'No se pudo crear el animal.');
      newAnimalMessage.textContent = '¡Animal creado exitosamente!';
      newAnimalMessage.style.color = 'green';
      setTimeout(() => {
        bsNewAnimalModal.hide();
        mostrarAnimales();
      }, 1000);
    } catch (error) {
      newAnimalMessage.textContent =
        error.message || 'Error al crear el animal.';
      newAnimalMessage.style.color = 'red';
    }
  });
}

const resetDataButton = document.getElementById('resetDataButton');

if (resetDataButton) {
  resetDataButton.addEventListener('click', async () => {
    if (!token) return;
    resetDataButton.disabled = true;
    resetDataButton.textContent = 'Reseteando...';
    animalsMessage.textContent = '';
    try {
      const response = await fetch('http://localhost:3000/api/reset', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (handle401(response)) return;
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || 'Error al resetear datos');
      animalsMessage.textContent = '¡Datos reseteados correctamente!';
      animalsMessage.style.color = 'green';
      mostrarAnimales();
    } catch (error) {
      animalsMessage.textContent = error.message || 'Error al resetear datos';
      animalsMessage.style.color = 'red';
    } finally {
      resetDataButton.disabled = false;
      resetDataButton.textContent = '🔄 Resetear datos';
    }
  });
}
