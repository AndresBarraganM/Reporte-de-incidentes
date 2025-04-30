import {z} from 'zod';

const usuarioSchema = z.object({
  nombre: z.string().max(100),
  email: z.string().email(),
  contrasena_hash: z.string().min(8).max(100),
})

export function verificarUsuarioZod(usuario) {
  return usuarioSchema.safeParse(usuario)
}