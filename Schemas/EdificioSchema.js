import {z} from "zod";
import { EdificioModel } from "../Modelos/AmazonRDS/EdificioModel.js"; // modelo de baños

const EdificioSchema = z.object({
  nombre: z.string().max(250),
  planta: z.string().max(250),
}).refine(async (edificio) => {
  try {
    const edificioEncontrado = await EdificioModel.getEdificio(edificio)
    return edificioEncontrado !== null || edificioEncontrado !== undefined ? true : false;
  } catch (error) {
    console.error("Error al validar el edificio:", error);
    return false;
  }
}, {
  message: "El edifivio no existe en la base de datos"
});

export async function validarEdificioZod(edificio) {
  return await EdificioSchema.safeParseAsync(edificio);
}