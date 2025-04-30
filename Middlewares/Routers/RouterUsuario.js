import { Router } from 'express'

import { ControlerUsuario } from '../../Controlers/ControlerUsuarios.js'

export const UsuarioRouter = Router()

UsuarioRouter .post('/login',  ControlerUsuario.loginUsuario)

UsuarioRouter .post('/', ControlerUsuario.postUsuario)

UsuarioRouter .delete('/', ControlerUsuario.deleteUsuario)
