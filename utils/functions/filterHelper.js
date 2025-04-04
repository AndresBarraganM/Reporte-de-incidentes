// Funciones para Filtros
function aplicarFiltros(filtros) {
    const filas = document.querySelectorAll('.listado tbody tr');
    
    filas.forEach(fila => {
        const fechaIncidente = fila.cells[3].textContent.split(' ')[0];
        const ubicacion = fila.cells[1].textContent.trim().toLowerCase();
        const estado = fila.cells[4].textContent.trim().toLowerCase();
        const prioridad = fila.dataset.prioridad;

        const coincideFecha = !filtros.fecha || fechaIncidente === filtros.fecha;
        const coincideUbicacion = !filtros.banio || ubicacion === filtros.banio.toLowerCase();
        const coincideEstado = !filtros.estado || estado === filtros.estado.toLowerCase();
        const coincidePrioridad = !filtros.prioridad || prioridad === filtros.prioridad.toLowerCase();

        fila.style.display = (coincideFecha && coincideUbicacion && coincideEstado && coincidePrioridad) 
            ? '' 
            : 'none';
    });
}

// Función para manejar el envío del formulario de filtros
document.getElementById('filtro-incidentes').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const filtros = {
        fecha: this.fecha.value,
        banio: this.banio.value,
        estado: this.estado.value,
        prioridad: this.prioridad.value
    };
    
    aplicarFiltros(filtros);
});

// Funciones para Acciones de Incidentes
function cambiarEstado(idIncidente, nuevoEstado) {
    const fila = document.querySelector(`tr[data-id="${idIncidente}"]`);
    if (fila) {
        fila.cells[4].textContent = nuevoEstado;
        // Aquí iría la llamada API para actualizar el estado en el backend
        console.log(`Estado cambiado a: ${nuevoEstado} para el incidente ${idIncidente}`);
    }
}

// Manejo de clic en las acciones del dropdown
document.querySelectorAll('.dropdown-content a[data-estado]').forEach(boton => {
    boton.addEventListener('click', function(e) {
        e.preventDefault();
        const idIncidente = this.closest('tr').dataset.id; // Asumiendo que agregas data-id a cada fila
        const nuevoEstado = this.dataset.estado;
        cambiarEstado(idIncidente, nuevoEstado);
    });
});

// Función para mostrar detalles del incidente
function mostrarDetalle(idIncidente) {
    const modal = document.getElementById('detalle-incidente');
    // Aquí deberías cargar los datos reales del incidente
    modal.style.display = 'block';
}

// Manejo del modal
document.querySelectorAll('.dropdown-content a[href="#detalle-incidente"]').forEach(boton => {
    boton.addEventListener('click', function(e) {
        e.preventDefault();
        const idIncidente = this.closest('tr').dataset.id;
        mostrarDetalle(idIncidente);
    });
});

// Cerrar modal
document.querySelector('.cerrar').addEventListener('click', function(e) {
    e.preventDefault();
    this.closest('.modal').style.display = 'none';
});

// Inicialización de eventos
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar filtros iniciales
    aplicarFiltros({
        fecha: '',
        banio: '',
        estado: '',
        prioridad: ''
    });
});