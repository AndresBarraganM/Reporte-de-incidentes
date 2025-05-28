import { Router } from 'express'

import {ControlerTipoIncidente } from '../../Controlers/ControlerTipoIncidente.js'
import { authMiddleware } from '../authMiddleware.js'

export const TipoIncidenteRouter = Router()

TipoIncidenteRouter.get('/', ControlerTipoIncidente.getTipoIncidentes)
TipoIncidenteRouter.post('/agregar', authMiddleware, ControlerTipoIncidente.agregarTipoIncidente)