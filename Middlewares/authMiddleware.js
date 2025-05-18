import { verificarToken } from "../utils/functions/jwt";

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Acceso no autorizado. Token no proporcionado." });
    }

    const decoded = verificarToken(token);

    if (!decoded) {
        return res.status(403).json({ message: "Token inválido o expirado." });
    }

    req.usuario = decoded;
    next();
}
