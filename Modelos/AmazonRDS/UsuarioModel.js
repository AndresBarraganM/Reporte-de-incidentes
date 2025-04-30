
import {modelo_usuarios} from './ModeloLogin.js'

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
     * rol: 2,
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
                console.log("el correo ya existe en la base de datos")
                return false
            }
        }
        catch(error){
            console.error('Error al agregar usuario', error)
            throw error; 
        }
    }

    // metodo para obtener a todos los usuarios
    /**
     * Obtiene a todos los usuario de la base de datos, si se pasa un correo como parametro
     * se buscará al usuario especificado
     * @param {string | null} correo
     * @returns {JSON | Array} retornaun JSON con los datos del usuario o un array de usuarios
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
                attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'rol'],
            });
            return usuario.dataValues
        }
        // Si no se especifica correo se retornan todos los usuarios
        else if(!correo){
            const usuarios = await modelo_usuarios.findAll({
                where: {
                    estado: 'activo'
                },
                attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'rol'],
                order: [['nombre', 'ASC']]
            });
            return usuarios.map(usuario => usuario.dataValues)
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
    static async deleteUsuario(correo){
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
                console.log(`se han actualizado ${usuario} filas`)
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
        
    }
}

