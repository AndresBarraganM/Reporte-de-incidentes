import z from 'zod';
import { TipoIncidenteModel } from '../Modelos/AmazonRDS/TipoIncidenteModel.js';

const schemaTipoincidente = z.object({
  tipo_incidente: z.string().max(250)
  .refine(async(tipo) => {
    return await revisarQueExisteEnDatabase(tipo)
  }, {
    message: 'El tipo de incidente no existe en la base de datos',
  })
});

async function revisarQueExisteEnDatabase(tipo) {
  const existe = await TipoIncidenteModel.getTipoIncidente(tipo);
  return existe != null;
}

export async function validarTipoIncidenteZod(incidente){
  const resultado = await schemaTipoincidente.safeParseAsync(incidente)
  
  return resultado
}

