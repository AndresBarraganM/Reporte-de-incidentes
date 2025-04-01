//import { } as Incidente from '../Models/Incidente.js'; // modelo de incidentes

// Controlers para recuperar incidentes, los cales son el conjunto de encuestas ya respondidas y almacenadas en la base de datos

export class ControlerIncidentes {

  // retornar incidentes
  static async getAll(req, res) {
    try {
      const incidentes = await Incidente.getIncidentes();
      res.status(200).json(incidentes);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getByParams(req, res) {
    parametros = req.params;
    console.log(parametros);

    return
  }

  static async getFotoIncidente(req, res) {
    return
  }

}


