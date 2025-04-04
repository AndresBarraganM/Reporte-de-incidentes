import { IncidenteRouter } from "./Middlewares/Routers/RouterIncidente.js";


//Creacion de la App
const createApp = () => {
  const app = express();

  app.use(json());
  app.disable('x-powered-by');

  // Routers
  app.use('/incidentes', IncidenteRouter)

  const PORT = process.env.PORT || 1234;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

createApp()