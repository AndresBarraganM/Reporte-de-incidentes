async function register() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validaciones de campos vacíos
    if (!nombre || !email || !telefono || !password) {
        alert('Por favor complete todos los campos');
        return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Ingrese un correo electrónico válido');
        return;
    }

    // Validación de teléfono (solo números y longitud de 7 a 15)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(telefono)) {
        alert('Ingrese un número de teléfono válido (solo números, 7 a 15 dígitos)');
        return;
    }

    // Validación de contraseña mínima
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
            window.location.href = "login.html";
        } else {
            alert(data.message || 'Error al registrar el usuario');
        }

    } catch (error) {
        console.error('Error:', error);
        showAlertModal(error.message || 'Error al conectar con el servidor');
    }
}

// Escucha del formulario
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    register();
});
