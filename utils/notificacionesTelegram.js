import axios from 'axios';
import dotenv from 'dotenv';
import UsuarioTelegram from '../Modelos/AmazonRDS/UsuarioTelegram.js';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

export async function notificarAdmins(mensaje) {
  try {
    const usuarios = await UsuarioTelegram.findAll();

    for (const usuario of usuarios) {
      await axios.get(URL, {
        params: {
          chat_id: usuario.chat_id,
          text: mensaje
        }
      });
    }
  } catch (error) {
    console.error("Error al notificar a los administradores:", error.message);
  }
}
