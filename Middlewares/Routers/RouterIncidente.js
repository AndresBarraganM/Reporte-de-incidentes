import { Router } from 'express'
import { ControlerIncidentes } from '../../Controlers/ControlerIncidentes.js';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const IncidenteRouter= Router()

IncidenteRouter.get('/',  ControlerIncidentes.getIncidentes)

IncidenteRouter.get('/foto/:id', ControlerIncidentes.getFotoIncidente)

IncidenteRouter.post(
  '/',
  upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'data', maxCount: 1 }
  ]),
  ControlerIncidentes.postIncidente
)

IncidenteRouter.put('/:id', ControlerIncidentes.actualizarEstadoIncidente);
