import { modelo_notificaciones } from "./database/ModeloDatos.js";
import { modelo_incidentes } from "./database/ModeloReportes.js";
import { modelo_usuarios } from "./database/ModeloLogin.js";

export class NotificacionModel {
    /**
     * Agrega una nueva notificación al sistema
     * @param {Object} datos
     * @param {number} datos.id_incidente
     * @param {number} datos.id_usuario
     * @param {'SMS'|'email'} datos.tipo_notificacion
     * @param {string} datos.mensaje
     * @param {Date} datos.fecha_envio
     * @returns {Object|boolean}
     */
    static async agregarNotificacion(datos) {
        try {
            const nuevaNotificacion = await modelo_notificaciones.create({
                id_incidente: datos.id_incidente,
                id_usuario: datos.id_usuario,
                tipo_notificacion: datos.tipo_notificacion,
                mensaje: datos.mensaje,
                fecha_envio: datos.fecha_envio
            });
            console.log("Notificación creada correctamente");
            return nuevaNotificacion;
        } catch (error) {
            console.log(`Error al agregar notificación: ${error}`);
            return false;
        }
    }

        static async obtenerNotificacionPorId(id) {
        try {
        const notificacion = await modelo_notificaciones.findByPk(id);
        return notificacion;
        } catch (error) {
        console.error("Error en obtenerNotificacionPorId:", error);
        return null;
        }
    }

    /**
     * Obtiene una o varias notificaciones, con posibilidad de filtrado
     * @param {Object|null} filtros - { id_usuario?, id_incidente? }
     * @returns {Array|Object|null}
     */
    static async obtenerNotificaciones(filtros = null) {
        try {
            const where = {};
            if (filtros?.id_usuario) where.id_usuario = filtros.id_usuario;
            if (filtros?.id_incidente) where.id_incidente = filtros.id_incidente;

            const notificaciones = await modelo_notificaciones.findAll({
                where,
                attributes: ['id_notificacion', 'tipo_notificacion', 'mensaje', 'fecha_envio'],
                include: [
                    {
                        model: modelo_usuarios,
                        attributes: ['id_usuario', 'nombre', 'email', 'telefono']
                    },
                    {
                        model: modelo_incidentes,
                        attributes: ['id_reporte', 'descripcion', 'estado', 'prioridad']
                    }
                ]
            });

            return notificaciones.map(n => ({
                id_notificacion: n.id_notificacion,
                tipo_notificacion: n.tipo_notificacion,
                mensaje: n.mensaje,
                fecha_envio: n.fecha_envio,
                usuario: {
                    id: n.usuario?.id_usuario,
                    nombre: n.usuario?.nombre,
                    email: n.usuario?.email,
                    telefono: n.usuario?.telefono
                },
                incidente: {
                    id: n.incidente?.id_reporte,
                    descripcion: n.incidente?.descripcion,
                    estado: n.incidente?.estado,
                    prioridad: n.incidente?.prioridad
                }
            }));
        } catch (error) {
            console.log(`Error al obtener notificaciones: ${error}`);
            return null;
        }
    }

    /**
     * Actualiza una notificación existente
     * @param {number} id_notificacion
     * @param {Object} datos - Campos que deseas actualizar
     * @returns {boolean}
     */
    static async actualizarNotificacion(id_notificacion, datos) {
        try {
            const [actualizado] = await modelo_notificaciones.update(datos, {
                where: { id_notificacion }
            });
            return actualizado > 0;
        } catch (error) {
            console.log(`Error al actualizar la notificación: ${error}`);
            return false;
        }
    }

    /**
     * Elimina una notificación por ID
     * @param {number} id_notificacion
     * @returns {boolean}
     */
    static async eliminarNotificacion(id_notificacion) {
        try {
            const eliminado = await modelo_notificaciones.destroy({
                where: { id_notificacion }
            });
            return eliminado > 0;
        } catch (error) {
            console.log(`Error al eliminar la notificación: ${error}`);
            return false;
        }
    }
}
