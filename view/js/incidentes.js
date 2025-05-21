async function getIncidentes() {
    const totalIncidentes = document.getElementById('total-incidentes')
    const pendientes = document.getElementById("pendientes-incidentes")
    try {
        const response = await fetch("http://localhost:1234/incidentes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 404) {
            throw new Error('No se encontró un usuario con estas credenciales');
        } else if (response.status === 400) {
            throw new Error('Error en la solicitud, por favor verifique los datos');
        } else if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();

        if (data.success) {
            // Cuenta la cantidad de incidentes retornados y los muestra en el dashboard
            totalIncidentes.innerText = data.datos.length
            const incidentesPendientes = data.datos.filter(incidente =>incidente.estado === 'pendiente')
            pendientes.innerText = incidentesPendientes.length
            
        } else {
            console.log(data.message || 'Error al cargar los datos');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlertModal(error.message || 'Error al conectar con el servidor');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getIncidentes();
});
