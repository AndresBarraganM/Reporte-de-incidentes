document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('authToken');
  if (!token) return alert("No has iniciado sesión");

  try {
    const response = await fetch('http://localhost:1234/usuario/perfil', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});


    const usuario = await response.json();

    if (response.ok) {
      document.getElementById('nombre').value = usuario.nombre || '';
      document.getElementById('email').value = usuario.email || '';
      document.getElementById('telefono').value = usuario.telefono || '';
      // No cargar la contraseña por seguridad
    } else {
      alert("Error al obtener datos del usuario: " + usuario.message);
    }
  } catch (err) {
    console.error("Error de red o servidor:", err);
    alert("Error al conectar con el servidor");
  }
});
