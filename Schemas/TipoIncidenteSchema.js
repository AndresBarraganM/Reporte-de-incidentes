import z from 'zod';
import { TipoIncidenteModel } from '../Modelos/AmazonRDS/TipoIncidenteModel.js';

const schemaTipoincidente = z.object({
  tipo_incidente: z.string().max(250)
  .refinement(async(tipo) => {
    return await revisarQueExisteEnDatabase(tipo)
  }, {
    message: 'El tipo de incidente no existe en la base de datos',
  })
})

async function revisarQueExisteEnDatabase(tipo) {
  const existe = await TipoIncidenteModel.getTipoIncidente(tipo)
  if (existe == null) {
    return false
  } else {
    return true
  }
}

export function validarTipoIncidenteZod(incidente){
  const resultado = schemaTipoincidente.safeParse(incidente)
  
  return resultado
}


console.log(validarTipoIncidenteZod({tipo_incidente: 'Falta de jabónaso'}))