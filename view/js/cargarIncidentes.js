async function cargarIncidentes(filtros = {}) {
  const params = new URLSearchParams();

  if (filtros.fechaInicio) params.append('fechaInicio', filtros.fechaInicio);
  if (filtros.fechaFin) params.append('fechaFin', filtros.fechaFin);
  if (filtros.estado) params.append('estado', filtros.estado);
  if (filtros.prioridad) params.append('prioridad', filtros.prioridad);

  try {
    const response = await fetch(`http://localhost:1234/incidentes?${params.toString()}`);
    if (!response.ok) throw new Error('Error al obtener incidentes');

    const data = await response.json();
    const incidentes = data.datos;
    const tbody = document.getElementById('tabla-incidentes-body');
    tbody.innerHTML = '';

    incidentes.forEach(incidente => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-estado-actual', incidente.estado);
      const detalleString = encodeURIComponent(JSON.stringify(incidente));

      tr.innerHTML = `
        <td>${incidente.id_reporte}</td>
        <td>${incidente.bano.edificio.nombre} - Planta: ${incidente.bano.edificio.planta} - Baño: ${incidente.bano.genero}</td>
        <td>${incidente.incidente.nombre}</td>
        <td>${new Date(incidente.fecha_reporte).toLocaleString()}</td>
        <td>${incidente.prioridad}</td>
        <td>${incidente.estado}</td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">Acciones</button>
            <div class="dropdown-content">
              <a href="#" class="ver-detalle" data-detalle="${detalleString}">Ver Detalle</a>
              <a href="#" data-estado="en_proceso">Marcar como En Proceso</a>
              <a href="#" data-estado="resuelto">Marcar como Resuelto</a>
              <a href="#" data-estado="pendiente">Marcar como Pendiente</a>
            </div>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // SE AGREGA ESTE EVENTO DESPUÉS DE LLENAR LA TABLA
    tbody.querySelectorAll('.ver-detalle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();

        const detalle = JSON.parse(decodeURIComponent(btn.dataset.detalle));

        document.getElementById('detalle-id').textContent = detalle.id_reporte;
        document.getElementById('detalle-ubicacion').textContent = `${detalle.bano.edificio.nombre} - Planta ${detalle.bano.edificio.planta} - Baño ${detalle.bano.genero}`;
        document.getElementById('detalle-tipo').textContent = detalle.incidente.nombre;
        document.getElementById('detalle-descripcion').textContent = detalle.descripcion;
        document.getElementById('detalle-fecha').textContent = new Date(detalle.fecha_reporte).toLocaleString();
        document.getElementById('detalle-prioridad').textContent = detalle.prioridad;
        document.getElementById('detalle-estado').textContent = detalle.estado;

        document.getElementById('modal-detalle').style.display = 'block';
      });
    });

    // Evento para cambiar estado del incidente
    tbody.querySelectorAll('.dropdown-content a[data-estado]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();

        const tr = btn.closest('tr');
        const id = tr.querySelector('td').textContent.trim();
        const nuevoEstado = btn.dataset.estado;
        const estadoActual = tr.getAttribute('data-estado-actual');

        if (estadoActual === nuevoEstado) {
          Swal.fire({
            icon: 'info',
            title: 'Sin cambios',
            text: `El incidente ya está marcado como "${nuevoEstado}"`,
            timer: 2000,
            showConfirmButton: false
          });
          return;
        }

        try {
          const response = await fetch(`http://localhost:1234/incidentes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
          });

          if (!response.ok) throw new Error('Error al actualizar el estado');

          Swal.fire({
            icon: 'success',
            title: 'Estado actualizado',
            text: `El incidente se marcó como "${nuevoEstado}"`,
            timer: 2000,
            showConfirmButton: false
          });

          cargarIncidentes(filtros); // refrescar manteniendo filtros
        } catch (error) {
          console.error(error);
          alert('No se pudo actualizar el estado');
        }
      });
    });

  } catch (error) {
    console.error(error);
    alert('Error cargando los incidentes');
  }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarIncidentes();

  document.getElementById('filtro-incidentes').addEventListener('submit', (e) => {
    e.preventDefault();

    const filtros = {
      fechaInicio: document.getElementById('fecha-inicio').value,
      fechaFin: document.getElementById('fecha-fin').value,
      estado: document.getElementById('estado').value,
      prioridad: document.getElementById('prioridad').value,
    };

    cargarIncidentes(filtros);
  });
});

// Cerrar modal detalle
document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-detalle').style.display = 'none';
});
