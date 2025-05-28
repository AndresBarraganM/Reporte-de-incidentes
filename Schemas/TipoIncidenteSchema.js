import z from 'zod';
import { TipoIncidenteModel } from '../Modelos/AmazonRDS/TipoIncidenteModel.js';

const schemaTipoincidente = z.object({
  nombre: z.string().max(250)
  .refine(async(tipo) => {
    return await revisarQueExisteEnDatabase(tipo)
  }, {
    message: 'El tipo de incidente no existe en la base de datos',
  })
});

async function revisarQueExisteEnDatabase(tipo) {
  const existe = await TipoIncidenteModel.getTipoIncidente(tipo);
  return existe != null ? false : true;
}

export async function validarTipoIncidenteZod(incidente){
  const resultado = await schemaTipoincidente.safeParseAsync(incidente)
  
  return resultado
}

