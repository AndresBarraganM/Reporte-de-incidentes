
import {modelo_usuarios} from './database/ModeloLogin.js'

export class UsuarioModelo{
    
    // Metodo para agregar usuario
    /**
     * 
     * @param {JSON} datos para agregar al usuario, el JSON debe contener
     * @example UsuarioModelo.agregarUsuario(datos)
     * datos = {
     * nombre: 'NombreUsuario',
     * email: 'email@example.com',
     * telefono: '6461233445',
     * contrasenia: 'contraseña123'
     * }
     * @returns {JSON}
     */
    static async agregarUsuario(datos){
        try{
            // Primero se busca si existe un usuario con el correo
            const usuario = await modelo_usuarios.findOne({
                where: {
                    email: datos.email
                }
            });
            console.log(usuario)
            // Si No existe correo asignado al usuario entonces se agrega el registro
            if(!usuario){
                const nuevoUsuario = await modelo_usuarios.create(datos)
                return nuevoUsuario.dataValues
            }
            else{
                return null
            }
        }
        catch(error){
            console.error('Error al agregar usuario', error)
            throw error; 
        }
    }

        /**
     * Metodo que retorna solo el id, nombre y email de todos los usuarios activos
     * @returns {Array} Array de usuarios con solo id, nombre y email
     */
    static async getUsuariosBasico() {
        try {
            const usuarios = await modelo_usuarios.findAll({
                attributes: ['id_usuario', 'nombre', 'email'],
                /* where: {
                    estado: 1 // Solo usuarios activos (opcional si usas lógica de eliminación)
                }, */
                order: [['nombre', 'ASC']]
            });
            return usuarios.map(usuario => usuario.dataValues);
        } catch (error) {
            console.error('Error al obtener usuarios basicos:', error);
            throw error;
        }
    }


    // metodo para obtener a todos los usuarios
    /**
     * Obtiene a todos los usuario de la base de datos, si se pasa un correo como parametro
     * se buscará al usuario especificado
     * @param {string | null} correo
     * @returns {JSON | Array | null} retornaun JSON con los datos del usuario o un array de usuarios
     * @example UsuarioModelo.getUsuarios(correo)
     * 'o bien'
     * UsuarioModelo.getUsuarios()
     */
    static async getUsuarios(correo){
        // Si se recibe un correo, se busca el usuario por correo
        if(correo){
            const usuario = await modelo_usuarios.findOne({
                where: {
                    email: correo
                },
                attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'contrasena_hash'],
            });
            return usuario ? usuario.dataValues : null;
        }
        // Si no se especifica correo se retornan todos los usuarios
        else if(!correo){
            const usuarios = await modelo_usuarios.findAll({
                attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'contrasena_hash'],
                order: [['nombre', 'ASC']]
            });
            return usuarios.map(usuario => usuario.dataValues)
        }
    }

    static async getUsuarioPorId(id_usuario) {
        try {
            const usuario = await modelo_usuarios.findOne({
                where: {
                    id_usuario: id_usuario
                },
                attributes: ['id_usuario', 'nombre', 'email', 'telefono']
            });
            return usuario ? usuario.dataValues : null;
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            throw error;
        }
    }

    // Cambio de datos
    /**
     * 
     * @param {JSON} datos para actualizar el usuario, el JSON debe contener
     * @param {*} emailOriginal 
     * @returns 
     */
    static async updateUsuario(datos, emailOriginal){
        try{
        const usuarioExistente = await modelo_usuarios.findOne({
            where: {
                email: datos.email
            },
        });
        // Si el usuario no existe, se retorna false
        if(usuarioExistente && usuarioExistente.email !== emailOriginal) {
            console.log('El correo ya existe en la base de datos')
            return null
        }
        const [usuario] = await modelo_usuarios.update(datos,{
            where: {
                email: emailOriginal
            }
        })
        
        if (usuario > 0){
            console.log(`se han actualizado ${usuario} filas`)
            return 'Registro actualizado correctamente'
        }
        else {
            console.log(`No se encontró usuario con el email ${datos.email} o no se han realizado los cambios`)
            return null
        }
    }
    catch(error){
        return {status: 500, error: 'Error al actualizar el registro'}
    }
    }

    /**
     * Elimina de la tabla el registro con el correo seleccionado
     * @param {string} correo 
     * @returns 
     */
    /* static async deleteUsuario(correo){
        try{
            const [usuario] = await modelo_usuarios.update({estado: 2},{
                where: {
                    email: correo,
                    estado:1
                }
            })
            // Si encuentra el correo retorna mensaje de éxito
            console.log(usuario)
            if(usuario > 0){
                console.log(`se han eliminado ${usuario} filas`)
                return 'Registro eliminado correctamente'
            }
            // retorna Null si no se encontró el campo que se desea eliminar
            else {
                console.log(`No se encontró usuario con el email ${correo}`)
                return null
            }
        }
        catch(error){
            return {status: 500, error: 'Error al eliminar el registro'}
        }
    } */

    /**
     * Metodo que permite validar si existe un usuario con el nombre y la contraseña especificados
     * @param {string} nombre 
     * @param {string} contraseña 
     * @returns {JSON | null} retorna un JSON con los datos del usuario o null si no se encuentra
     * @example UsuarioModelo.validarCuenta("corre@example.com", "contraseña123")
     */
    static async validarCuenta(nombre){
        try{
            const usuario = await modelo_usuarios.findOne({
                where: {
                    nombre: nombre
                }
            });
            return usuario ? usuario.dataValues : null;
        }catch(error){
            console.error('Error al validar cuenta', error)
            throw error; 
        }
    }

    // En UsuarioModelo.js
/* static async getUsuarioPorId(id_usuario) {
  const [rows] = await this.db.execute('SELECT nombre, email, telefono FROM usuarios WHERE id_usuario = ?', [id_usuario]);
  return rows[0];
} */

/* static async eliminarUsuario(id) {
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  const [resultado] = await connection.query(query, [id]);
  return resultado;
} */

 // Eliminar usuario por ID (físicamente)
    static async eliminarUsuario(id) {
        try {
            const eliminados = await modelo_usuarios.destroy({
                where: {
                    id_usuario: id
                }
            });
            return eliminados;
        } catch (error) {
            console.error('Error al eliminar usuario por ID:', error);
            throw error;
        }
    }
}

