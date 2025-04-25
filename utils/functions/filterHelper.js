// Función principal para aplicar filtros
function aplicarFiltros(filtros) {
    const filas = document.querySelectorAll('.listado tbody tr');
    
    filas.forEach(fila => {
        // Extraer datos de cada fila
        const fechaHora = fila.cells[3].textContent;
        const fechaIncidente = fechaHora.split(' ')[0]; // Separar fecha y hora
        const ubicacion = fila.cells[1].textContent.trim().toLowerCase();
        const estado = fila.cells[4].textContent.trim().toLowerCase();
        
        // Obtener prioridad (asumiendo que está en un data-attribute)
        const prioridad = fila.dataset.prioridad || '';

        // Verificar coincidencia con cada filtro
        const coincideFecha = !filtros.fecha || fechaIncidente === filtros.fecha;
        const coincideUbicacion = !filtros.banio || ubicacion === filtros.banio.toLowerCase();
        const coincideEstado = !filtros.estado || estado === filtros.estado.toLowerCase();
        const coincidePrioridad = !filtros.prioridad || prioridad === filtros.prioridad.toLowerCase();

        // Mostrar/ocultar fila según coincidencia
        fila.style.display = (coincideFecha && coincideUbicacion && coincideEstado && coincidePrioridad) 
            ? '' 
            : 'none';
    });
}

// Manejador del formulario de filtros
document.getElementById('filtro-incidentes').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Recoger valores de los filtros
    const filtros = {
        fecha: this.fecha.value,
        banio: this.banio.value,
        estado: this.estado.value,
        prioridad: this.prioridad.value
    };
    
    aplicarFiltros(filtros);
});

// Función para limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtro-incidentes').reset();
    aplicarFiltros({
        fecha: '',
        banio: '',
        estado: '',
        prioridad: ''
    });
}

// Ejemplo de filtrado por prioridad (puedes agregar más funciones específicas)
function filtrarPorPrioridad(nivelPrioridad) {
    document.getElementById('prioridad').value = nivelPrioridad;
    aplicarFiltros({ prioridad: nivelPrioridad });
}

// Event listener para cambios en tiempo real (opcional)
document.querySelectorAll('#filtro-incidentes input, #filtro-incidentes select').forEach(elemento => {
    elemento.addEventListener('change', function() {
        document.getElementById('filtro-incidentes').dispatchEvent(new Event('submit'));
    });
});