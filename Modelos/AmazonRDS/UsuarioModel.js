const bcrypt = require('bcrypt');
const { modelo_usuarios } = require('./ModeloLogin.js'); // Asegúrate de que este modelo esté correctamente definido

class ControllerLogin {

    /**
     * Autentica un usuario
     * @param {string} email 
     * @param {string} contrasena 
     * @returns {Object} usuario autenticado o error
     */
    static async login(email, contrasena) {
        try {
            const usuario = await modelo_usuarios.findOne({
                where: { email },
                attributes: ['id_usuario', 'nombre', 'email', 'telefono', 'contrasena']
            });

            if (!usuario) {
                return { status: 401, message: 'Correo no registrado' };
            }

            const valido = await bcrypt.compare(contrasena, usuario.contrasena);

            if (!valido) {
                return { status: 401, message: 'Contraseña incorrecta' };
            }

            // Opcional: eliminar el hash antes de retornar el objeto
            const usuarioData = usuario.dataValues;
            delete usuarioData.contrasena;

            return { status: 200, usuario: usuarioData };
        } catch (error) {
            console.error('Error al autenticar usuario:', error);
            return { status: 500, message: 'Error del servidor al autenticar' };
        }
    }
}

module.exports = ControllerLogin;
