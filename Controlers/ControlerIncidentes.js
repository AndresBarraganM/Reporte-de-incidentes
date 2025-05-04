import { IncidenteModel } from '../Modelos/AmazonRDS/IncidenteModel.js'; // modelo de incidentes

import { validarIncidenteZod } from '../Schemas/IncidenteSchema.js'
import { validarFoto } from '../Schemas/FotoSchema.js';

import { separaUbicacion } from '../utils/functions/separarUbicacion.js';
import { almacenarFoto } from '../utils/functions/almacenarFoto.js';

export class ControlerIncidentes {

  // retornar incidentes
  static async getIncidentes(req, res) {
    try {
      const filtros = {};

      // Extrae los parámetros de la query y los agrega a los filtros si existen
      if (req.query.edificio) filtros.edificio = req.query.edificio;
      if (req.query.banio) filtros.genero = req.query.genero;
      if (req.query.planta) filtros.planta = req.query.planta;
      if (req.query.estado) filtros.estado = req.query.estado;
      if (req.query.prioridad) filtros.prioridad = req.query.prioridad;
      if (req.query.fechaAntesDe || req.query.fechaDespuesDe) {
        filtros.fecha = {};
        if (req.query.fechaAntesDe) filtros.fecha.antesDe = new Date(req.query.fechaAntesDe);
        if (req.query.fechaDespuesDe) filtros.fecha.despuesDe = new Date(req.query.fechaDespuesDe);
      }
      
      // recuperar reporte
      const incidentes = await IncidenteModel.obtenerIncidentes(filtros);
      console.log(filtros)
      
      res.status(200).json(incidentes);

    }catch(error){
      res.status(500).json({ error: 'Error al recuperar los incidentes', error });
    }
  }

  // obtener foto de un incidente seugn ID
  static async getFotoIncidente(req, res) {
    const id = req.params.id;

    if (!id){
      res.status(400).json({ message: 'Se requiere indicar una id' });
      return
    }

    // recuperar imagenes
    const imagenes = {message:"NO IMPLEMENTADO"};
    if (imagenes.length === 0) {
      res.status(404).json({ message: 'No se encontraron imágenes para el incidente' });
      return;
    }

    return res.status(200).json(imagenes);
  }

  // agregar un incidente a la base de datos
  static async postIncidente(req, res) {
    let reporte, foto

    // conprobar segun esquema
    if (req.body.data== null) {
      return res.status(400).json({ error: "faltan campos requeridos"})
    }
    

    try {
      reporte = JSON.parse(req.body.data);

      foto = req.files.foto ? req.files.foto[0]  : false;

    } catch (error) {
      res.status(500).json({error: "error al parsear el json: " + error})
      return
    }

    // separar el campo de banio y eliminar ubicacion
    // validar que el campo de ubicacion no este vacio
    if (!reporte.ubicacion) {
      res.status(400).json({error: "el campo ubicacion no puede estar vacio"})
      return
    }
    const ubicacion = reporte.ubicacion
    const resultado = separaUbicacion(ubicacion);
    reporte.nombre = resultado.nombre;
    reporte.planta = resultado.planta;
    delete reporte.ubicacion;

    // verificar reporte
    const resultadoVerificacion = await validarIncidenteZod(reporte)
    if (!resultadoVerificacion.success){
      res.status(400).json({error: resultadoVerificacion.error})
      return
    }

    // agregar a base de datos
    // manejar foto
    if(foto){
      if (!validarFoto(foto)){
        res.status(400).json({error: "formato de la foto incorrecto"}) 
       return
      }  
      try {
        const nombreFoto = await almacenarFoto(foto)

        reporte.img = nombreFoto
      } catch (error) {
        console.log("error al almacenar la foto: " + error)      
      }
    }

    // agregar reportes
    try {
      await IncidenteModel.generarIncidente(reporte)
    } catch (error) {
      res.status(500).json({message: "no se pudo registar el incidente", error: error})       
    }

    res.status(200).json({message: "incidente registrado exitosamente"})
  }
}
// formato de un incidente
// DESPUES de separar el campo ubicacion
// const incidente = {
//   genero_bano: 'hombre',
//   tipo_incidente: 'Banadalismo',
//   descripcion: 'agua',
//   nombre: 'Centro de Información',
//   planta: 'baja'
// }

