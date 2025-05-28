import { Router } from 'express'
import { authMiddleware } from '../authMiddleware.js'
import { ControlerBano } from '../../controlers/ControlerBano.js'

export const BanoRouter= Router()

BanoRouter.get('/', authMiddleware,  ControlerBano.getBanos)
BanoRouter.post('/agregar', authMiddleware, ControlerBano.postBano)
