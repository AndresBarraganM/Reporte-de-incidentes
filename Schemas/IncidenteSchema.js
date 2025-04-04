import { z } from "zod";
import { validarBano } from "./BanoSchema.js"

// consideraciones para los banos en otro esquema
const schemaIncidente = z.object({
  descripcion: z.string().max(250),
  Tipo_incidente: z.string().max(250)
})

export function validarIncidente(incidente){
  // utilizar esquema para verificar datos
  resultado = schemaIncidente.safeParse(incidente)
  if (!resultado.succes){
    return false
  }

  // verificar datos de bano
  bano = {
    ubicacion: incidente.ubicacion,
    genero: incidente.genero
  }
  
  if(!validarBano(bano)) {
    return false
  }
  
  // verificar que el tipo de incidente este correcto
  return false

}

