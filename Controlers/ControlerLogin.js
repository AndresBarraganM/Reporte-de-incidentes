const { modelo_usuarios } = require('./ModeloLogin.js');

class ControllerLogin {
  /**
   * Autenticar usuario sin usar hash
   * @param {string} email
   * @param {string} contrasena
   * @returns {Object} usuario o error
   */
  static async login(email, contrasena) {
    try {
      const usuario = await modelo_usuarios.findOne({
        where: { email, contrasena },
        attributes: ['id_usuario', 'nombre', 'email', 'telefono', ]
      });

      if (!usuario) {
        return { status: 401, message: 'Credenciales inválidas' };
      }

      return { status: 200, usuario: usuario.dataValues };
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      return { status: 500, message: 'Error del servidor al autenticar' };
    }
  }
}

module.exports = ControllerLogin;
