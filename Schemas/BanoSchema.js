import {z} from "zod";
import { BanoModel } from "../Modelos/AmazonRDS/BanoModel.js"; // modelo de baños

const banoSchema = z.object({
  edificio: z.string().max(250),
  genero: z.string().max(250)
})

export function validarBano(bano) {
  // Validar el esquema del baño
  const resultado = banoSchema.safeParse(bano);
  if (!resultado.success) {
    return false
  }

  // Validar que el baño exista dentro de la base de datos
  existeBano = BanoModel.existeBano(bano.edificio, bano.genero)
  if (!existeBano) {
    return false
  }

  return true
}