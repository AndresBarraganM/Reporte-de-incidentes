// En este archivo se encuentran los metdos relacionados a ejecutar filtros

export async function obtenerSectionFiltro() {
  // obtener select para ubicaciones
  const selectUbicaciones = await obtenerListaUbicaciones()
  
  return `
    <section class="filtros-avanzados">
      <h2>Filtros Avanzados</h2>
      <form id="form-filtros">
        <div class="campo">
          <label for="fecha-inicio">Fecha Inicio:</label>
          <input type="date" id="fecha-inicio" name="fecha-inicio">
        </div>
        <div class="campo">
          <label for="fecha-fin">Fecha Fin:</label>
          <input type="date" id="fecha-fin" name="fecha-fin">
        </div>
        <div class="campo">
          <label for="ubicacion">Ubicación:</label>
           ${selectUbicaciones.outerHTML}
        </div>
        <div class="campo">
          <label for="estado">Estado:</label>
          <select id="estado" name="estado">
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En Proceso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
        <button type="submit">Aplicar Filtros</button>
      </form>
    </section>
  `
}

/* * Ejecuta la obtención de incidentes filtrados según los valores de los filtros
  * Depende de que obtenerSectionFiltro() exista en algun lado de la paguina
  * @returns {Promise<Object>} Retorna una promesa que resuelve con los datos filtrados
  */

export async function ejecutarObtencionFiltrada() {
  // Obtener los valores de los filtros
  const fechaInicio = document.getElementById('fecha-inicio').value;
  const fechaFin = document.getElementById('fecha-fin').value;
  const ubicacion = document.getElementById('ubicacion').value;
  let edificio = '';
  let planta = '';
  if (ubicacion !== 'Ninguna') {
    // Si la ubicación tiene el formato "Edificio Planta", separar los valores
    const partes = ubicacion.split(' planta ');
    edificio = partes[0];
    planta = partes[1]; // Unir el resto como planta
  }
  const estado = document.getElementById('estado').value;

  // Crear un objeto con los filtros
  const filtros = {
    'fechaDespuesDe': fechaInicio,
    'fechaAntesDe': fechaFin,
    'edificio': edificio, 
    'planta': planta,
    'estado': estado
  };
  // Obtener los datos filtrados de la API
  return await obtenerIncidentesAPI(filtros)
}


export async function obtenerIncidentesAPI(filtros = {}){
  const queryParams = new URLSearchParams(filtros).toString();
  const url = `http://localhost:1234/incidentes${queryParams ? '?' + queryParams : ''}`;
  console.log('URL de la API:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }
    const temp = await response.json();
    const data = temp.datos

    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
  
}

export async function obtenerListaUbicaciones() {
  const select = document.createElement('select');
  select.id = 'ubicacion';

  try {
    const response = await fetch('http://localhost:1234/banios');
    const data = await response.json();

    const ubicacionesUnicas = new Set();

    // Agregar opcion para ninguno
    ubicacionesUnicas.add('Ninguna');

    data.forEach(banio => {
      if (banio.ubicacion) {
        ubicacionesUnicas.add(banio.ubicacion);
      }
    });

    // Agregar cada ubicación como opción
    ubicacionesUnicas.forEach(ubicacion => {
      const option = document.createElement('option');
      option.value = ubicacion;
      option.textContent = ubicacion;
      select.appendChild(option);
    });

    return select;

  } catch (error) {
    console.error('Error al obtener las ubicaciones:', error);
    return select; // Devuelve el <select> vacío en caso de error
  }
}
