// Metodo para obtener la fecha y hora actual en formato compatible con base de datos

async function getDateTime(){
        const fecha = new Date();
        const milisegundos = fecha.getTime(); // Obtiene los milisegundos desde la época UNIX

        // Convertir los milisegundos a formato compatible con base de datos
        const fechaLocal = new Date(milisegundos);  // Crea un objeto Date con los milisegundos

        // Formatear la fecha como YYYY-MM-DD HH:MM:SS
        const anio = fechaLocal.getFullYear();
        const mes = (fechaLocal.getMonth() + 1).toString().padStart(2, '0');
        const dia = fechaLocal.getDate().toString().padStart(2, '0');
        const hora = fechaLocal.getHours().toString().padStart(2, '0');
        const minutos = fechaLocal.getMinutes().toString().padStart(2, '0');
        const segundos = fechaLocal.getSeconds().toString().padStart(2, '0');

        const fechaFormateada = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

        console.log(fechaFormateada); // Ejemplo: "2025-03-31 14:15:30"

        return fechaFormateada;  // Devuelve la fecha compatible con la base de datos
    }
