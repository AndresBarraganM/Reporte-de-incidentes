document.addEventListener('DOMContentLoaded', () => {
  const btnAgregar = document.querySelector('.btn.agregar');
  const contenedor = document.querySelector('.control-acceso');

  let formularioVisible = false;

  btnAgregar.addEventListener('click', () => {
    if (formularioVisible) return;

    const formulario = document.createElement('form');
    formulario.id = 'register-form';
    formulario.classList.add('formulario-usuario');
    formulario.innerHTML = `
      <h3>Nuevo Usuario</h3>
      <label>Nombre:
        <input type="text" id="nombre" required>
      </label>
      <label>Email:
        <input type="email" id="email" required>
      </label>
      <label>Telefono:
        <input type="text" id="telefono" required>
      </label>
      <label>Contraseña:
        <input type="password" id="password" required>
      </label>
      <div class="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button" id="cancelarFormulario">Cancelar</button>
      </div>
    `;

    //contenedor.appendChild(formulario);
    //contenedor.insertBefore(formulario, contenedor.firstChild);
    btnAgregar.parentNode.insertBefore(formulario, btnAgregar.nextSibling);


    formularioVisible = true;

    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      await register();
    });

    document.getElementById('cancelarFormulario').addEventListener('click', () => {
      formulario.remove();
      formularioVisible = false;
    });
  });
});

async function register() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!nombre || !email || !telefono || !password) {
    alert('Por favor complete todos los campos');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Ingrese un correo electrónico válido');
    return;
  }

  const phoneRegex = /^[0-9]{7,15}$/;
  if (!phoneRegex.test(telefono)) {
    alert('Ingrese un número de teléfono válido (solo números, 7 a 15 dígitos)');
    return;
  }

  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  }

  try {
    const response = await fetch("http://localhost:1234/usuario/usuario", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        email,
        telefono,
        contrasena_hash: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error(data.message || 'Datos inválidos, verifique los campos');
        case 401:
          throw new Error('No autorizado, debe iniciar sesión');
        case 403:
          throw new Error('Acceso prohibido');
        case 500:
          throw new Error('Error interno del servidor, intente más tarde');
        default:
          throw new Error(data.message || 'Error desconocido');
      }
    }

    if (data.success) {
      alert('Usuario registrado exitosamente');
      // Opcional: cerrar el formulario y refrescar la tabla
      document.getElementById('register-form').remove();
      location.reload();


    } else {
      alert(data.message || 'Error al registrar el usuario');
    }

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Error al conectar con el servidor');
  }
}


