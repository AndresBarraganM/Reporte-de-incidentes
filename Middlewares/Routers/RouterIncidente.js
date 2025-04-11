import { Router } from 'express'

import { ControlerIncidentes } from '../../controlers/ControlerIncidentes.js'

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const IncidenteRouter= Router()

IncidenteRouter.get('/',  ControlerIncidentes.getIncidentes)

IncidenteRouter.get('/foto/:id', ControlerIncidentes.getFotoIncidente)

IncidenteRouter.post('/', upload.single('foto'), ControlerIncidentes.postIncidente)
