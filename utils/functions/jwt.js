import jwt from 'jsonwebtoken';

// Clave secreta para firmar los tokens (debe estar en una variable de entorno en producción)
const SECRET_KEY = process.env.JWT_SECRET || '9EapfyGrLeugfQH7NOqRJhnYoL83';

/**
 * Genera un token JWT para un usuario
 * @param {Object} usuario - Datos del usuario (id_usuario, nombre)
 * @returns {string} Token JWT
 */
export function generarToken(usuario) {
    const payload = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
}

/**
 * Verifica y decodifica un token JWT
 * @param {string} token - Token JWT a verificar
 * @returns {Object | null} Decodificado si es válido, null si es inválido
 */
export function verificarToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Error al verificar token:', error);
        return null;
    }
}
