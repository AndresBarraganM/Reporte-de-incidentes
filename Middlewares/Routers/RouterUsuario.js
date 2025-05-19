import { Router } from 'express'

import { ControlerUsuario } from '../../Controlers/ControlerUsuarios.js'
import { authMiddleware } from '../authMiddleware.js'
import { registrarUsuario } from '../../Controlers/auth/authUser.js'

export const UsuarioRouter = Router()

UsuarioRouter.post('/login', ControlerUsuario.loginUsuario)

UsuarioRouter.post('/usuario', authMiddleware, registrarUsuario)

//UsuarioRouter .delete('/', ControlerUsuario.deleteUsuario)
