import { IncidenteRouter } from "./Middlewares/Routers/RouterIncidente.js";
import { TipoIncidenteRouter } from "./Middlewares/Routers/RouterTipoIncidente.js";
import { BanoRouter } from "./Middlewares/Routers/RouterBano.js";

import multer from 'multer';
import  express, { json } from "express";
import cors from 'cors';

//Creacion de la App
const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.disable('x-powered-by');

  // Routers
  app.use('/incidentes', IncidenteRouter)
  app.use('/banos', BanoRouter)
  app.use('/tipos_incidentes', TipoIncidenteRouter )

  const PORT = process.env.PORT || 1234;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

createApp()