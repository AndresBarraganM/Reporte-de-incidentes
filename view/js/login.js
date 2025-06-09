/* async function loginUser() {
    const nombre = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

    if (!nombre || !password) {
        alert('Por favor complete todos los campos');
        return;
    }

    try {
        const response = await fetch("http://localhost:1234/usuario/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre, contrasena_hash: password })
        });

        const data = await response.json();
        

        if(response.status === 404) {
            throw new Error('No se encontro un usuario con estas credenciales');
        } else if (response.status === 400) {
            throw new Error('Error en la solicitud, por favor verifique los datos');
        } else if (!response.ok) {
            throw new Error(data.message || 'Error en la autenticación');
        }

        if (data.success) {
            // Store the token
            localStorage.setItem('authToken', data.token);
            window.location.href = "usuarios.html"

        } else {
            alert(data.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlertModal(error.message || 'Error al conectar con el servidor');
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    // Botón de iniciar sesión
        e.preventDefault();
        loginUser();
    
}) */

        // Funcion para mostrar errores en pantalla y ocultarlos despues de 4 segundos
function showAlertModal(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;

    // Desaparece el mensaje despues de 4 segundos
    setTimeout(() => {
        errorDiv.textContent = '';
    }, 4000);
}

// Funcion principal de login
async function loginUser() {
    // Limpiar mensajes anteriores
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
        showAlertModal('Por favor complete todos los campos');
        return;
    }

    try {
        const response = await fetch(window.serverConfig.direccionServidor+"usuario/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, contrasena_hash: password })
        });

        const data = await response.json();

        if (response.status === 404) {
            throw new Error('No se encontro un usuario con estas credenciales');
        } else if (response.status === 400) {
            throw new Error('Error en la solicitud, por favor verifique los datos');
        } else if (!response.ok) {
            throw new Error(data.message || 'Error en la autenticacion');
        }

        if (data.success) {
            // Guardar el token
            localStorage.setItem('authToken', data.token);
                console.log('Token guardado:', data.token);  // <-- aquí

            window.location.href = "dashboard.html";
        } else {
            showAlertModal(data.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlertModal(error.message || 'Error al conectar con el servidor');
    }
}

// Asociar evento al formulario
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del form
    loginUser();
});
