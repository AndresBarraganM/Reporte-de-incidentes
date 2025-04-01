import express, { json } from 'express'
// Importar Routers
import { RouterIncidentes } from './Middlewares/Routers/RouterIncidentes.js';


//Creacion de la App
const createApp = () => {
  const app = express();

  app.use(json());
  app.disable('x-powered-by');

  app.use('/incidentes', RouterIncidentes);

  const PORT = process.env.PORT || 1234;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}
createApp()