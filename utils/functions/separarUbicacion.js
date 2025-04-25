

export function separaUbicacion(ubicacion) {
  let nombre, planta;
  
  const partes = ubicacion.split("planta");
  nombre = partes[0].trim();
  planta = partes[1] ? partes[1].trim() : "";

  return { nombre, planta }; // Devuelve un objeto con ambas propiedades
}
