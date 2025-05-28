import { Router } from 'express'

import { ControlerUsuario } from '../../Controlers/ControlerUsuarios.js'
import { authMiddleware } from '../authMiddleware.js'
import { registrarUsuario } from '../../Controlers/auth/authUser.js'

export const UsuarioRouter = Router()

UsuarioRouter.post('/login', ControlerUsuario.loginUsuario)

UsuarioRouter.post('/usuario', authMiddleware, registrarUsuario)

// Nueva ruta para obtener usuarios basicos
UsuarioRouter.get('/usuarios/basico',   authMiddleware,  ControlerUsuario.getUsuariosBasico)


// Por esta:
UsuarioRouter.get('/perfil', authMiddleware, ControlerUsuario.getPerfilUsuario);

//RUTA PARA BORRAR UN USUARIO
UsuarioRouter.delete('/eliminar/:id', authMiddleware, ControlerUsuario.deleteUsuario);

// Ruta para actualizar un usuario
UsuarioRouter.patch('/actualizar', authMiddleware, ControlerUsuario.updateUsuario);



//UsuarioRouter .delete('/', ControlerUsuario.deleteUsuario)
