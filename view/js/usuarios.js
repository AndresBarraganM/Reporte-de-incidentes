/* document.addEventListener('DOMContentLoaded', () => {
  const tablaUsuarios = document.getElementById('listaUsuarios');

  // Obtenemos el token del localStorage
  const token = localStorage.getItem('authToken');
  console.log('Token recuperado:', token);

  // Si no hay token, redirigimos al login
  if (!token) {
    alert("Debes iniciar sesion primero");
    window.location.href = "login.html";
    return;
  }

  // Aqui se agrega el token al fetch
  fetch('http://localhost:1234/usuario/usuarios/basico', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(usuarios => {
      usuarios.forEach(usuario => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
          <td>${usuario.id_usuario}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.email}</td>
          <td>
            <button class="btn eliminar">Eliminar</button>
          </td>
        `;

        tablaUsuarios.appendChild(fila);

        const btnEliminar = fila.querySelector('.eliminar');
        btnEliminar.addEventListener('click', () => {
          Swal.fire({
    title: `¿Seguro que quieres eliminar a ${usuario.nombre}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://tu-api.com/usuario/eliminar/${usuario.id_usuario}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
              .then(res => {
                if (res.ok) {
                  fila.remove();
                  //alert('Usuario eliminado correctamente');
                  Swal.fire({
                icon: 'success',
                title: `Bien`,
                text: `Usuario eliminado correctamente`,
                timer: 2000,
                showConfirmButton: true
            });
                } else {
                  alert('Error al eliminar el usuario');
                }
              })
              .catch(err => {
                console.error('Error en la eliminación:', err);
                alert('No se pudo eliminar el usuario');
              });
          }
        });

      });
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
    });
});
 */

document.addEventListener('DOMContentLoaded', () => {
  const tablaUsuarios = document.getElementById('listaUsuarios');

  // Obtenemos el token del localStorage
  const token = localStorage.getItem('authToken');
  console.log('Token recuperado:', token);

  // Si no hay token, redirigimos al login
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Sesion requerida',
      text: 'Debes iniciar sesion primero',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "login.html";
    });
    return;
  }

  // Aqui se agrega el token al fetch
  fetch('http://localhost:1234/usuario/usuarios/basico', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(usuarios => {
      usuarios.forEach(usuario => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
          <td>${usuario.id_usuario}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.email}</td>
          <td>
            <button class="btn eliminar">Eliminar</button>
          </td>
        `;

        tablaUsuarios.appendChild(fila);

        const btnEliminar = fila.querySelector('.eliminar');
        btnEliminar.addEventListener('click', () => {
          Swal.fire({
            title: `¿Seguro que quieres eliminar a ${usuario.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:1234/usuario/eliminar/${usuario.id_usuario}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
                .then(res => {
                  if (res.ok) {
                    fila.remove();
                    Swal.fire({
                      icon: 'success',
                      title: 'Usuario eliminado',
                      text: `El usuario ${usuario.nombre} fue eliminado correctamente`,
                      timer: 2000,
                      showConfirmButton: false
                    });
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'No se pudo eliminar el usuario',
                      confirmButtonText: 'OK'
                    });
                  }
                })
                .catch(err => {
                  console.error('Error en la eliminación:', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al conectar con el servidor',
                    confirmButtonText: 'OK'
                  });
                });
            }
          });
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar',
        text: 'No se pudieron cargar los usuarios',
        confirmButtonText: 'OK'
      });
    });
});
