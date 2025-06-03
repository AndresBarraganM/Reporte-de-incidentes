import { Router } from 'express'
import { authMiddleware } from '../authMiddleware.js'
import { ControlerEdificio } from '../../Controlers/ControlerEdificio.js'

export const EdificioRouter= Router()

EdificioRouter.get('/',  ControlerEdificio.getEdificio)
EdificioRouter.post('/agregar', authMiddleware, ControlerEdificio.agregarEdificio)
