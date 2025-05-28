import {z} from "zod";
import { BanoModel } from "../Modelos/AmazonRDS/BanoModel.js"; // modelo de baños

const banoSchema = z.object({
  nombre: z.string().max(250),
  planta: z.string().max(250),
  genero_bano: z.enum(['hombre', 'mujer'])
}).refine(async (bano) => {
  try {
    const banoEncontrado = await BanoModel.obtenerBano(bano);
    return banoEncontrado !== null || banoEncontrado !== undefined ? true : false;
  } catch (error) {
    console.error("Error al validar el baño:", error);
    return false;
  }
}, {
  message: "El baño no existe en la base de datos"
});

export async function validarBanoZod(bano) {
  return await banoSchema.safeParseAsync(bano);
}