/**
 * Obtiene los datos del usuario y mostrarlos en el perfil al que corresponde.
 * Dependiendo del tipo de usuario, se hace una solicitud a un endpoint diferente.
 * @returns {JSON} usuario - Objeto que contiene los datos del usuario.
 */
async function obtenerDatos() {
    try{
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No se ha iniciado sesión');
        }
        const response = await fetch('http://localhost:1234/usuario/perfil', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        if(!response.ok){
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Datos del usuario obtenidos:', data);
        localStorage.setItem('password', data.password)
        return data;
    }
    catch(error){
        console.error('Error al obtener los datos del usuario:', error);
        throw error;
    }
}

window.onload = () => {
    obtenerDatos().then(usuario =>{
        // Se mandan a llamar los elementos del DOM 
        const input_nombre = document.getElementById('nombre');
        const input_email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        
        // Se asignan los valores a los elementos del DOM
        input_email.value = usuario.email;
        telefono.value = usuario.telefono;
        input_nombre.value = usuario.nombre;
    })
}