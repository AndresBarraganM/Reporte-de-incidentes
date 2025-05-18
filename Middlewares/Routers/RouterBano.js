import { Router } from 'express'



import { ControlerBano } from '../../controlers/ControlerBano.js'

export const BanoRouter= Router()

BanoRouter.get('/',  ControlerBano.getBanos)
