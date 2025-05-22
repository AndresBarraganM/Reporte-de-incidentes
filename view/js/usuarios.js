
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

        const btnEliminar = fila.querySelector('.eliminar');
        btnEliminar.addEventListener('click', () => {
          if (confirm(`¿Seguro que quieres eliminar a ${usuario.nombre}?`)) {
            fetch(`http://localhost:1234/usuario/eliminar/${usuario.id_usuario}`, {
              method: 'DELETE'
            })
            .then(res => {
              if (res.ok) {
                fila.remove();
                alert('Usuario eliminado correctamente');
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
