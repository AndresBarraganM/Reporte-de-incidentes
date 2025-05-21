async function cargarIncidentes(filtros = {}) {
  const params = new URLSearchParams();

  if (filtros.fecha) params.append('fechaDespuesDe', filtros.fecha);
  if (filtros.banio) params.append('banio', filtros.banio);
  if (filtros.estado) params.append('estado', filtros.estado);
  if (filtros.prioridad) params.append('prioridad', filtros.prioridad);

  try {
    const response = await fetch(`http://localhost:1234/incidentes?${params.toString()}`);
    if (!response.ok) throw new Error('Error al obtener incidentes');

    const incidentes = await response.json();
    const tbody = document.getElementById('tabla-incidentes-body');
    tbody.innerHTML = '';

    incidentes.forEach(incidente => {
      const tr = document.createElement('tr');
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
              <a href="#" data-estado="en-proceso">Marcar como En Proceso</a>
              <a href="#" data-estado="resuelto">Marcar como Resuelto</a>
              <a href="#" data-estado="pendiente">Marcar como Pendiente</a>
            </div>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // ←↓↓ SE AGREGA ESTE EVENTO DESPUÉS DE LLENAR LA TABLA
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

  } catch (error) {
    console.error(error);
    alert('Error cargando los incidentes');
  }
}


  // Cargar incidentes al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    cargarIncidentes();

    // Agregar evento al formulario de filtro
    document.getElementById('filtro-incidentes').addEventListener('submit', (e) => {
      e.preventDefault();

      const filtros = {
        fecha: document.getElementById('fecha').value,
        banio: document.getElementById('banio').value,
        estado: document.getElementById('estado').value,
        prioridad: document.getElementById('prioridad').value,
      };

      cargarIncidentes(filtros);
    });
  });

document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-detalle').style.display = 'none';
});