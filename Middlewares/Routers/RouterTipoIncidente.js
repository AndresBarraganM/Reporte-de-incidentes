import { Router } from 'express'

import {ControlerTipoIncidente } from '../../Controlers/ControlerTipoIncidente.js'

export const TipoIncidenteRouter = Router()

TipoIncidenteRouter.get('/', ControlerTipoIncidente.getTipoIncidentes)