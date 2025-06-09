import { z } from 'zod';

const usuarioSchema = z.object({
  nombre: z.string().max(100),
  email: z.string().email(),
  contrasena_hash: z.string().min(8).max(100),
  telefono: z.string().regex(/^\d{10}$/, {
    message: 'El teléfono debe tener exactamente 10 dígitos numéricos',
  }),
});

export function validarParcialUsuario(usuario){
  const resultado = usuarioSchema.partial().safeParse(usuario)
  console.log(resultado)
  return resultado.success;
}

export function verificarUsuarioZod(usuario) {
  return usuarioSchema.safeParse(usuario);
}

// Solo valida nombre y email (útil para edición parcial, por ejemplo)
export function verificarUsuarioCredencialesZod(usuarioParcial) {
  const parcialSchema = z.object({
    email: usuarioSchema.shape.email,
    contrasena_hash: usuarioSchema.shape.contrasena_hash,
  });
  return parcialSchema.safeParse(usuarioParcial);
}
