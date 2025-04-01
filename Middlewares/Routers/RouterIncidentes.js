import { Router } from 'express'

import { ControlerIncidentes } from '../../Controlers/ControlerIncidentes.js'

export const RouterIncidentes = Router()

RouterIncidentes.get('/', ControlerIncidentes.getIncidentes)
RouterIncidentes.get('/foto/:id', ControlerIncidentes.getFotoIncidente)