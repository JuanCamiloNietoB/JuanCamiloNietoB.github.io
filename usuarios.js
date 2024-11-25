const API_URL = 'https://backend-api-mcp3.onrender.com'; // Cambia a la URL de tu backend

// Cargar usuarios al cargar la página
document.addEventListener('DOMContentLoaded', loadUsers);

// Función para cargar usuarios
async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      headers: { }
    });
    const users = await response.json();
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; // Limpiar la tabla
    users.forEach(user => {
      userTableBody.innerHTML += `
        <tr>
          <td>${user.user_id}</td>
          <td>${user.first_name}</td> <!-- Corregido -->
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td>${new Date(user.birthday).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.user_id})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
}

// Formulario para agregar usuario
const addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const first_name = document.getElementById('firstName').value;  // Corregido
  const last_name = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const birthday = document.getElementById('birthday').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,  // Corregido
        last_name: last_name,
        email: email,
        birthday: birthday,
        password: password  // Faltaba en la solicitud
      })
    });
    if (response.ok) {
      loadUsers(); // Recargar la tabla
      addUserForm.reset(); // Limpiar el formulario
      alert('Usuario agregado exitosamente');
    } else {
      alert('Error al agregar usuario');
    }
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
});

// Función para eliminar usuario
async function deleteUser(id) {
  if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

  try {
    const response = await fetch(`${API_URL}/signup/${id}`, {
      method: 'DELETE',
      headers: { }
    });
    if (response.ok) {
      loadUsers(); // Recargar la tabla
      alert('Usuario eliminado exitosamente');
    } else {
      alert('Error al eliminar usuario');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
}
