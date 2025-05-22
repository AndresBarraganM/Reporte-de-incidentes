async function getIncidentes() {
  const totalIncidentes = document.getElementById('total-incidentes')
  const pendientes = document.getElementById("pendientes-incidentes")

  try {
    const response = await fetch("http://localhost:1234/incidentes", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error('Error al obtener los incidentes')

    const data = await response.json()

    if (data.success) {
      totalIncidentes.innerText = data.datos.length
      const incidentesPendientes = data.datos.filter(i => i.estado === 'pendiente')
      pendientes.innerText = incidentesPendientes.length
      incidentes(data)
    } else {
      console.log(data.message || 'Error al cargar datos')
    }
  } catch (error) {
    console.error('Error:', error)
    Swal.fire('Error', error.message, 'error')
  }
}

async function incidentes(datos) {
  const incidentes = datos.datos.filter(i => i.estado === 'pendiente')
  if(!Array.isArray(incidentes) || incidentes.length === 0) {
    const incidentesTableBody = document.querySelector('#tabla-incidentes tbody')
    incidentesTableBody.innerHTML = '<tr><td colspan="7">No hay incidentes pendientes</td></tr>'
    return
  }
  const incidentesTableBody = document.querySelector('#tabla-incidentes tbody')
  incidentesTableBody.innerHTML = ''

  incidentes.forEach(incidente => {
    const tr = document.createElement('tr')
    const detalle = encodeURIComponent(JSON.stringify(incidente))

    tr.innerHTML = `
      <td>${incidente.id_reporte}</td>
      <td>Baño ${incidente.bano.edificio.nombre} - Planta ${incidente.bano.edificio.planta} - ${incidente.bano.genero}</td>
      <td>${incidente.incidente.nombre}</td>
      <td>${new Date(incidente.fecha_reporte).toLocaleString()}</td>
      <td>${incidente.prioridad}</td>
      <td>${incidente.estado}</td>
      <td>
        <button class="ver-detalle" data-detalle="${detalle}">Ver Detalle</button>
        <button class="marcar-resuelto" data-id="${incidente.id_reporte}">Marcar como Resuelto</button>
      </td>
    `
    incidentesTableBody.appendChild(tr)
  })

  document.querySelectorAll('.ver-detalle').forEach(btn => {
    btn.addEventListener('click', e => {
      const detalle = JSON.parse(decodeURIComponent(btn.dataset.detalle))

      document.getElementById('detalle-id').textContent = detalle.id_reporte
      document.getElementById('detalle-ubicacion').textContent = `${detalle.bano.edificio.nombre} - Planta ${detalle.bano.edificio.planta} - ${detalle.bano.genero}`
      document.getElementById('detalle-tipo').textContent = detalle.incidente.nombre
      document.getElementById('detalle-descripcion').textContent = detalle.descripcion
      document.getElementById('detalle-fecha').textContent = new Date(detalle.fecha_reporte).toLocaleString()
      document.getElementById('detalle-prioridad').textContent = detalle.prioridad
      document.getElementById('detalle-estado').textContent = detalle.estado

      document.getElementById('modal-detalle').style.display = 'block'
    })
  })

  document.querySelectorAll('.marcar-resuelto').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = btn.dataset.id
      try {
        const response = await fetch(`http://localhost:1234/incidentes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: 'resuelto' })
        })

        if (!response.ok) throw new Error('No se pudo actualizar el estado')

        Swal.fire({
          title: 'Actualizado',
          text: `El incidente ${id} fue marcado como resuelto.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })

        getIncidentes()
      } catch (error) {
        console.error(error)
        Swal.fire('Error', error.message, 'error')
      }
    })
  })
}

document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-detalle').style.display = 'none'
})

document.addEventListener('DOMContentLoaded', () => {
  getIncidentes()
})
document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-detalle').style.display = 'none'
})

window.addEventListener('click', e => {
  const modal = document.getElementById('modal-detalle');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});