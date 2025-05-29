import axios from 'axios';
import dotenv from 'dotenv';
import UsuarioTelegram from '../Modelos/AmazonRDS/UsuarioTelegram.js';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const URL = `https://api.telegram.org/bot${TOKEN}`;
let ULTIMO_UPDATE_ID = 0;
const RESPUESTA_BOT = "Hola, soy el bot SGI de REPORTEC...";

async function obtenerMensajes() {
  try {
    const res = await axios.get(`${URL}/getUpdates`, {
      params: {
        offset: ULTIMO_UPDATE_ID + 1,
        timeout: 60
      },
      timeout: 70000
    });
    return res.data.result;
  } catch (err) {
    console.error("Error al obtener mensajes:", err.message);
    return [];
  }
}

async function enviarMensaje(chat_id, mensaje) {
  try {
    await axios.get(`${URL}/sendMessage`, {
      params: { chat_id, text: mensaje }
    });
  } catch (err) {
    console.error("Error al enviar mensaje:", err.message);
  }
}

async function escucharBot() {
  console.log("Bot de Telegram iniciado...");
  while (true) {
    const mensajes = await obtenerMensajes();
    for (const m of mensajes) {
      ULTIMO_UPDATE_ID = m.update_id;
      if (m.message) {
        const chat_id = m.message.chat.id;
        const texto = (m.message.text || "").toLowerCase();
        const nombre = `${m.message.chat.first_name || ""} ${m.message.chat.last_name || ""}`.trim();

        if (texto.includes("hola")) {
          await enviarMensaje(chat_id, RESPUESTA_BOT);
        }

        // Guardar en DB
        await UsuarioTelegram.findOrCreate({
          where: { chat_id },
          defaults: { nombre }
        });
      }
    }
  }
}

export { escucharBot };
