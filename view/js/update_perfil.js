// Actualizar perfil
async function updatePerfil(nombre, contrasena, correo, telefono) {
  try {
    // verifica y asigna datos a un objeto
    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (contrasena) datosActualizados.contrasena_hash = contrasena;
    if (correo) datosActualizados.email = correo;
    if (telefono) datosActualizados.telefono = telefono;

    // ----------------------VERIFICACIÓN DE DATOS----------------------
    // Verifica si hay datos para actualizar
    if (Object.keys(datosActualizados).length === 0) {
      Swal.fire({
      icon: 'info',
      title: 'Sin cambios',
      text: 'No se han realizado cambios para actualizar.',
      confirmButtonColor: '#3085d6'
      });
      return;
    }
    // verifica que el telefono tenga 10 dígitos y sea numérico
    if (telefono && (!/^\d{10}$/.test(telefono))) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El número de teléfono debe tener 10 dígitos numéricos.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    // verifica que el correo tenga un formato válido
    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'El correo electrónico no tiene un formato válido.',
        confirmButtonColor: '#d33'
      });
      return;
    }


    // ----------------------ENVIO DE DATOS----------------------
    // Realiza la solicitud PATCH al endpoint correspondiente
    const response = await fetch('http://localhost:1234/usuario/actualizar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify(datosActualizados)
    });

    const resultado = await response.json();

    if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Perfil actualizado correctamente',
      confirmButtonColor: '#3085d6'
    });
}   else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: resultado.mensaje || 'No se pudo actualizar el perfil',
      confirmButtonColor: '#d33'
    });
}

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    Swal.fire({
  icon: 'error',
  title: 'Error inesperado',
  text: 'Ocurrió un error al actualizar el perfil.',
  timer: 3000,
  showConfirmButton: false
});

  }
}

// Manejo del formulario
const form = document.getElementById('form-editar-perfil');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtiene los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value.trim(); // Elimina espacios en blanco
  const newContrasena = document.getElementById('contrasena').value;
  const newCorreo= document.getElementById('email').value;
  const newtelefono = document.getElementById('telefono').value;


  console.log('Nombre:', nombre);
  console.log('Nueva contraseña:', newContrasena);
  console.log("Correo:", newCorreo);
  console.log("Teléfono:", newtelefono);
  // Llamar a la actualización
  updatePerfil(nombre, newContrasena, newCorreo, newtelefono);
});