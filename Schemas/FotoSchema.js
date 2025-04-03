
// validar foto
export function validarFoto(foto){
  if (foto.size > 5000000){
    return false
  }
  return true
}