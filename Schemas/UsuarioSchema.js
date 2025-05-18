import { z } from 'zod';

const usuarioSchema = z.object({
  nombre: z.string().max(100),
  email: z.string().email(),
  contrasenia: z.string().min(8).max(100),
  telefono: z.string().regex(/^\d{10}$/, {
    message: 'El teléfono debe tener exactamente 10 dígitos numéricos',
  }),
});

export function verificarUsuarioZod(usuario) {
  return usuarioSchema.safeParse(usuario);
}

// Solo valida nombre y email (útil para edición parcial, por ejemplo)
export function verificarUsuarioCredencialesZod(usuarioParcial) {
  const parcialSchema = z.object({
    nombre: usuarioSchema.shape.nombre,
    contrasenia: usuarioSchema.shape.contrasenia,
  });
  return parcialSchema.safeParse(usuarioParcial);
}
