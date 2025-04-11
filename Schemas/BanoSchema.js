import {z} from "zod";
import { BanoModel } from "../Modelos/AmazonRDS/BanoModel.js"; // modelo de baños

const banoSchema = z.object({
  nombre: z.string().max(250),
  planta: z.string().max(250),
  genero_bano: z.enum(['hombre', 'mujer']) // Nota: hay un typo aquí ('hombre' debería ser 'hombre')
}).refine(async (bano) => {
  const existeBano = await BanoModel.obtenerBano(bano);
  return existeBano !== null;
}, {
  message: "El baño no existe en la base de datos"
});

export function validarBanoZod(bano) {
  // Validar el esquema del baño
  const resultado = banoSchema.safeParseAsync(bano);
  
  return resultado;
}