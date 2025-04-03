
import {modelo_usuarios} from './ModeloLogin.js'

class UsuarioModelo{
    
    // Metodo para agregar usuario
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
                return JSON.stringify(nuevoUsuario, null, 2)
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
    static async getUsuarios(){
        const usuarios = await modelo_usuarios.findAll();
        return JSON.stringify(usuarios, null, 2);
    }

    // Cambio de datos
    static async updateUsuario(datos){
        try{
        const [usuario] = await modelo_usuarios.update(datos,{
            where: {
                email: datos.email
            },
        });
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

    static async deleteUsuario(datos){
        const usuario = await modelo_usuarios.update({estado: 2},{
            where: {
                email: datos.email
            }
        })
    }
}

UsuarioModelo.agregarUsuario({
    nombre: 'Salva Laguna',
    email: 'al22760575@ite.edu.mx',
    telefono: '5849265365',
    rol: 2,
    contrasenia: 'atunconarroz'
}).then((usuario) => {
    console.log(usuario)
})

