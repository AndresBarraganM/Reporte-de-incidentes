/* document.addEventListener('DOMContentLoaded', async () => {
  const tablaUsuarios = document.querySelector('tbody');

  try {
    const respuesta = await fetch('http://localhost:1234/usuario/usuarios/basico', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si usas autenticacion, descomenta esta línea:
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error('Error al obtener usuarios:', data.message || data);
      return;
    }

    // Limpiar tabla antes de llenar
    tablaUsuarios.innerHTML = '';

    // Insertar cada usuario en una fila
    data.usuarios.forEach(usuario => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuario.id_usuario}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>
          <button class="btn editar">Editar</button>
          <button class="btn eliminar">Eliminar</button>
        </td>
      `;
      tablaUsuarios.appendChild(fila);
    });

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
});
 */
document.addEventListener('DOMContentLoaded', () => {
  const tablaUsuarios = document.getElementById('listaUsuarios');

  fetch('http://localhost:1234/usuario/usuarios/basico')
    .then(response => response.json())
    .then(usuarios => {
      usuarios.forEach(usuario => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
          <td>${usuario.id_usuario}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.email}</td>
          <td>
            <button class="btn editar">Editar</button>
            <button class="btn eliminar">Eliminar</button>
          </td>
        `;

        tablaUsuarios.appendChild(fila);
      });
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
    });
});
