// Metodos relaiconados con request
// como por ejemplo obtener datos de estos

export const obtenerMailDeReq = (req) => {
  if (!req.user || !req.user.email) {
      throw new Error("Usuario no autenticado o email no disponible");
  }
  return req.user.email;
};

export function obtenerIdDeReq (req) {
  return req.usuario.id_usuario
}