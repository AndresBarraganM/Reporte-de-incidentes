import { z } from "zod";
import { validarBanoZod } from "./BanoSchema.js"
import { validarTipoIncidenteZod } from "./TipoIncidenteSchema.js" // esquema de validacion para tipos de incidentes

// consideraciones para los banos en otro esquema
const schemaIncidente = z.object({
  descripcion: z.string().max(250),
})

export function validarIncidenteZod(incidente){
  // utilizar esquema para verificar datos
  const resultado = schemaIncidente.safeParse(incidente)
  if (!resultado.succes){
    return resultado
  }

  // verificar datos de bano
  const bano = {
    nombre: incidente.nombre,
    planta: incidente.planta,
    genero_bano: incidente.genero_bano
  }
  
  // verificar que exista el bano en la base de datos
  const resultadoBano = validarBanoZod(bano)
  if(!resultadoBano.success){ 
    return resultadoBano
  }
  
  // verificar el campo de tipo incidente
  const tipo_incidente = {tipo_incidente: incidente.tipo_incidente}
  const resultadoTipoIncidente = validarTipoIncidenteZod(tipo_incidente)
  if(!resultadoTipoIncidente.success){
    return resultadoTipoIncidente
  }

  // si todo esta bien entonces enviar el original
  return resultado
}



/* 
Formato deseado:*/
const incidente = {
  genero_bano: 'hombre',
  tipo_incidente: 'Falta de jabón',
  descripcion: 'agua',
  nombre: '200',
  planta: 'alta'
}
console.log('inicio')
console.log(validarIncidenteZod(incidente))
console.log('fin')