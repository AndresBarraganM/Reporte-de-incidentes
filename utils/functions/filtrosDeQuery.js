

// Obtiene la querry de req.query y la transforma en un objeto de filtros,
export function extraerFiltros(query) {
  const filtros = {};

  query.edificio && (filtros.edificio = query.edificio);
  query.genero && (filtros.genero = query.genero); // corregido: usas "banio" pero asignabas "genero"
  query.planta && (filtros.planta = query.planta);
  query.estado && (filtros.estado = query.estado);
  query.prioridad && (filtros.prioridad = query.prioridad);

  (query.fechaAntesDe || query.fechaDespuesDe) && (
    filtros.fecha = {},
    query.fechaAntesDe && (filtros.fecha.antesDe = new Date(query.fechaAntesDe)),
    query.fechaDespuesDe && (filtros.fecha.despuesDe = new Date(query.fechaDespuesDe))
  );

  return filtros;
}
