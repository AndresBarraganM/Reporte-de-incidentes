import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // si está en otro directorio


export async function almacenarFoto(foto) {
  // Obtener camino hacia la foto
  const ruta_fotos = process.env.PHOTO_PATH;

  if (ruta_fotos == undefined) {
    throw new Error(
      "No se ha definido la ruta para almacenar fotos en el archivo .env,Esta ha de ser almacenada bajo el nombre PHOTO_PATH"
    );
  }

  const extension = path.extname(foto.originalname); // Ej: .jpg
  const nombreArchivo = `${uuidv4()}${extension}`;

  const rutaDestino = path.join(ruta_fotos, nombreArchivo);

  // Escribir el archivo en el sistema
  fs.writeFileSync(rutaDestino, foto.buffer);

  return nombreArchivo
}

export async function recuperarPathFoto(nombreArchivo) {
  return path.join(process.env.PHOTO_PATH, nombreArchivo);
}