import { Router } from 'express'

import { ControlerUsuario } from '../../Controlers/ControlerUsuarios.js'

export const IncidenteRouter= Router()

IncidenteRouter.get('/',  ControlerUsuario.loginUsuario)

IncidenteRouter.post('/', ControlerUsuario.postUsuario)

IncidenteRouter.delete('/', ControlerUsuario.deleteUsuario)
