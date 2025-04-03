import { Router } from 'express'

import { ControlerIncidentes } from '../../controlers/ControlerIncidentes.js'

export const IncidenteRouter= Router()

IncidenteRouter.get('/',  ControlerIncidentes.getIncidentes)

IncidenteRouter.get('/foto/:id', ControlerIncidentes.getFotoIncidente)

IncidenteRouter.post('/', ControlerIncidentes.postIncidente)
