import path from 'path';

const extensiones_validas = ['.jpg', '.jpeg', '.png'];

// validar foto
export function validarFoto(foto){

  if (foto.size > 5000000){
    return false
  }
  
  const extension = path.extname(foto.originalname);
  if (!extensiones_validas.includes(extension)) {
    return false;
  }
  
  return true
}