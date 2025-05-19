async function loginUser() {
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
    
})