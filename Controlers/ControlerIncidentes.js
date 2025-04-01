//import { } as Incidente from '../Models/Incidente.js'; // modelo de incidentes

// Controlers para recuperar incidentes, los cales son el conjunto de encuestas ya respondidas y almacenadas en la base de datos

export class ControlerIncidentes {

  // retornar incidentes
  static async getAll(req, res) {
    try {
      const filtros = {};

      // Extrae los parámetros de la query y los agrega a los filtros si existen
      if (req.query.edificio) filtros.edificio = req.query.edificio;
      if (req.query.banio) filtros.banio = req.query.banio;
      if (req.query.planta) filtros.planta = req.query.planta;
      if (req.query.fechaAntesDe || req.query.fechaDespuesDe) {
        filtros.fecha = {};
        if (req.query.fechaAntesDe) filtros.fecha.$lte = new Date(req.query.fechaAntesDe);
        if (req.query.fechaDespuesDe) filtros.fecha.$gte = new Date(req.query.fechaDespuesDe);
      }
      
      // recuperar reporte
      const incidentes = {message:"NO IMPLEMENTADO"};

      res.json(incidentes);
    }catch(error){
      res.status(500).json({ message: 'Error al recuperar los incidentes', error });
    }
  }

  static async getFotoIncidente(req, res) {
    const id = req.params.id;

    if (!id){
      res.status(400).json({ message: 'Se requiere de una id' });
      return
    }
    return
  }

}


