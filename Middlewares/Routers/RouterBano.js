import { Router } from 'express'
import { authMiddleware } from '../authMiddleware.js'
import { ControlerBano } from '../../Controlers/ControlerBano.js'

export const BanoRouter= Router()

BanoRouter.get('/',  ControlerBano.getBanos)
BanoRouter.post('/agregar', authMiddleware, ControlerBano.postBano)
