console.log('hola mundo');

const getList = async () => {
  let lista = [];
  try {
    const response = await fetch('http://localhost:3000/api/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    lista = data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
  return lista;
};

const generateListCardPost = (container, lista) => {
  console.log(lista);
  container.innerHTML = ''; // Clear previous content
  const template = document.querySelector('#card-template');

  lista.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.id = `card-${item.id}`;
    const title = clone.querySelector('.card-title');
    if (title) title.textContent = item.title == '' ? 'Sin título' : item.title;
    const text = clone.querySelector('.card-text');
    if (text)
      text.textContent = item.content == '' ? 'Sin contenido' : item.content;
    container.appendChild(clone);
  });
  console.log('Cards generated:', lista.length);
};

const generateListCardUsers = (container, lista) => {
  console.log(lista);
  container.innerHTML = ''; // Clear previous content
  const template = document.querySelector('#jwt-card-template');
  if (!lista.users) {
    console.error('Template or lista.users is not defined');
    return;
  }

  lista.users.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.id = `card-${item.id}`;
    const name = clone.querySelector('.card-name');
    if (name) name.textContent = item.name == '' ? 'Sin título' : item.name;
    const email = clone.querySelector('.card-email');
    if (email)
      email.textContent = item.content == '' ? 'Sin contenido' : item.email;
    container.appendChild(clone);
  });
  console.log('Cards generated:', lista.length);
};

document.addEventListener('DOMContentLoaded', () => {
  // Section 1
  const button = document.getElementById('fetchButton');
  const container = document.getElementById('listContainer');

  if (button && container) {
    button.addEventListener('click', async () => {
      // alert('Button clicked!');

      const data = await getList();
      generateListCardPost(container, data);
    });
  } else {
    console.error('not all elements are present in the DOM');
  }

  // Section 2
  const submitPosteador = document.getElementById('posteador');
  const posteadorForm = document.getElementById('posteadorForm');

  if (submitPosteador && posteadorForm) {
    submitPosteador.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent form submission

      const title = posteadorForm.querySelector('#title').value;
      const content = posteadorForm.querySelector('#content').value;
      const userId = 1; // Assuming a static userId for now

      if (title && content) {
        try {
          const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, userId }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const newPost = await response.json();
          console.log('New post created:', newPost);

          // Optionally, you can clear the form fields
          posteadorForm.reset();

          if (button) button.click(); // Trigger the button click to refresh the list
        } catch (error) {
          console.error('Error creating post:', error);
        }
      } else {
        console.log('Please fill in both title and content fields.');
      }
    });
  }

  // Section 3
  const registerForm = document.getElementById('registerForm');
  const registerButton = document.getElementById('registerButton');
  const registerResponseMessage = document.getElementById(
    'registerResponseMessage'
  );

  if (registerButton && registerForm) {
    registerButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent form submission

      const username = registerForm.querySelector('#registerUsername').value;
      const password = registerForm.querySelector('#registerPassword').value;
      const email = registerForm.querySelector('#registerEmail').value;

      if (username && password && email) {
        try {
          const response = await fetch(
            'http://localhost:3000/api/auth/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: username,
                password,
                email,
              }),
            }
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          registerResponseMessage.textContent =
            result.message || 'Registration successful!';
          registerResponseMessage.style.color = 'green';

          // Optionally, you can clear the form fields
          registerForm.reset();
        } catch (error) {
          console.error('Error during registration:', error);
          registerResponseMessage.textContent =
            'Registration failed. Please try again.';
          registerResponseMessage.style.color = 'red';
        }
      } else {
        registerResponseMessage.textContent =
          'Please fill in both username and password fields.';
        registerResponseMessage.style.color = 'orange';
      }
    });
  } else {
    console.error('Register form or button not found in the DOM');
  }

  const loginForm = document.getElementById('loginForm');
  const loginButton = document.getElementById('loginButton');
  const loginResponseMessage = document.getElementById('loginResponseMessage');

  if (loginButton && loginForm) {
    loginButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent form submission

      const email = loginForm.querySelector('#email').value;
      const password = loginForm.querySelector('#password').value;

      if (email && password) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          loginResponseMessage.textContent =
            result.message || 'Login successful!';
          loginResponseMessage.style.color = 'green';

          // Optionally, you can clear the form fields
          loginForm.reset();

          // save the token in localStorage
          if (result.token) {
            localStorage.setItem('token', result.token);
            console.log('Token saved:', result.token);
          } else {
            console.error('No token received in login response');
          }
        } catch (error) {
          console.error('Error during login:', error);
          loginResponseMessage.textContent = 'Login failed. Please try again.';
          loginResponseMessage.style.color = 'red';
        }
      } else {
        loginResponseMessage.textContent =
          'Please fill in both email and password fields.';
        loginResponseMessage.style.color = 'orange';
      }
    });
  }

  // Section 4

  const fetchWithJwtButton = document.getElementById('fetchWithJwtButton');
  const jwtResponseMessage = document.getElementById('jwtResponseMessage');

  fetchWithJwtButton.addEventListener('click', async () => {
    // Obtengo el token guardado en localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      jwtResponseMessage.textContent = 'Please log in to fetch protected data.';
      jwtResponseMessage.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Protected data fetched:', data);
      // jwtResponseMessage.textContent = 'Protected data fetched successfully!';
      // jwtResponseMessage.style.color = 'green';

      // Generate cards for the fetched data

      generateListCardUsers(jwtResponseMessage, data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
      jwtResponseMessage.textContent = 'Failed to fetch protected data.';
      jwtResponseMessage.style.color = 'red';
    }
  });
});
