import { IncidenteRouter } from "./Middlewares/Routers/RouterIncidente.js";
import { TipoIncidenteRouter } from "./Middlewares/Routers/RouterTipoIncidente.js";
import { BanoRouter } from "./Middlewares/Routers/RouterBano.js";
import { EdificioRouter } from "./Middlewares/Routers/RouterEdificio.js";
import { UsuarioRouter } from "./Middlewares/Routers/RouterUsuario.js";
import { probarConexion } from "./utils/database_connection.js";

import { escucharBot } from "./services/botTelegram.js"; // <- NUEVO IMPORT

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
  app.use('/banios', BanoRouter)
  app.use('/tipos_incidentes', TipoIncidenteRouter )
  app.use('/usuario', UsuarioRouter)
  app.use('/edificio', EdificioRouter)

  // Probar conexión a la base de datos
  probarConexion()
    .then((result) => {
      if (result.exito) {
        console.log('✅ Conexión establecida correctamente.');
      } else {
        console.error('❌ No se pudo conectar a la base de datos:', result.error);
        process.exit(1) 
      }
    })
    .catch((error) => {
      console.error('Error inesperado:', error.message);
    });

  const PORT = process.env.PORT || 1234;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    escucharBot();
  });

}

createApp()