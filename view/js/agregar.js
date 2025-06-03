
const token = localStorage.getItem('authToken')

async function obtenerEdificios() {
    const select = document.getElementById('idEdificio')
    try {
        const response = await fetch("http://localhost:1234/edificio/", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();

            // Limpiar el select antes de llenarlo (opcional)
            select.innerHTML = '';

            // Agregar una opción por defecto (opcional)
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "-- Selecciona una opción --";
            select.appendChild(opcionDefault);

            // Recorrer y agregar las opciones dinámicamente
            for(const item of data.edificios){
                const option = document.createElement("option");
                option.value = `${item.nombre} planta ${item.planta}`;
                option.textContent = `${item.nombre} planta ${item.planta}`;
                select.appendChild(option);
            }
        } else {
            console.error("Error al obtener datos: " + response.status);
        }
    } catch (error) {
        console.error("Error al conectarse con el servidor", error);
    }
}



async function agregarEdificio(){
    const nombreEdificio = document.getElementById("nombreEdificio").value.trim()
    const plantaEdificio = document.getElementById("plantaEdificio").value.trim()
    console.log(nombreEdificio, plantaEdificio)

    try{
        const response = await fetch("http://localhost:1234/edificio/agregar", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                nombre: nombreEdificio,
                planta: plantaEdificio
            })
        });
        if(response.ok){
            const data = await response.json()
            console.log
            Swal.fire({
                icon: 'success',
                title: `Edificio ${data.edificio.nombre}`,
                text: `El Edificio ha sido agregado correctamente`,
                timer: 1200,
                showConfirmButton: false
            });
            return;
        }
    }
    catch(error){
            Swal.fire({
                icon: 'error',
                title: `Opss..`,
                text: `Error al agregar el edificio`,
                timer: 2000,
                showConfirmButton: false
            });
            return;
    }
}


async function agregarBano(){
    const SelectBano = document.getElementById('idEdificio').value
    const generoBano = document.getElementById('generoBano').value
    try{
        const response = await fetch('http://localhost:1234/banios/agregar', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ubicacion: SelectBano,
                genero_bano: generoBano
            })
        })

        if(response.ok){
            const data = await response.json()
            Swal.fire({
                icon: 'success',
                title: `Bien`,
                text: `Baño agregado correctamente`,
                timer: 2000,
                showConfirmButton: false
            });
            console.log(data)
            return;
        } else {
            Swal.fire({
                icon: 'error',
                title: `Opss..`,
                text: `Error al agregar el baño`,
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
    }
    catch(error){
        Swal.fire({
                icon: 'error',
                title: `Opss..`,
                text: `Error al agregar el baño`,
                timer: 2000,
                showConfirmButton: false
            });
            return;

    }
    };


async function agregarTipoIncidente() {
    const nombreIncidente = document.getElementById("nombreIncidente").value.trim();
    console.log("El nombre del incidente es: ", nombreIncidente);

    if (!nombreIncidente) {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Debes ingresar un nombre de incidente',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:1234/tipos_incidentes/agregar', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombreIncidente })
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: `Bien`,
                text: `Incidente agregado correctamente`,
                timer: 2000,
                showConfirmButton: false
            });
            console.log(data);
        } else {
            Swal.fire({
                icon: 'error',
                title: `Opss..`,
                text: `Error al agregar el incidente`,
                timer: 2000,
                showConfirmButton: false
            });
            console.error("Error en la respuesta del servidor:", response.status);
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `Opss..`,
            text: `Error al agregar el incidente`,
            timer: 2000,
            showConfirmButton: false
        });
        console.log("Error al agregar el incidente ", error);
    }
}


document.getElementById('formEdificio').addEventListener('submit', (e)=>{
    e.preventDefault();
    agregarEdificio()
})

document.getElementById('formBano').addEventListener('submit', (e)=>{
    e.preventDefault();
    agregarBano()
    
})

document.getElementById('formIncidente').addEventListener('submit', (e)=>{
    e.preventDefault();
    agregarTipoIncidente()
    
})

document.addEventListener("DOMContentLoaded", ()=>{
obtenerEdificios()
})