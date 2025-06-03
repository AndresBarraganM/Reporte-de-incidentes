const { application } = require("express")

const token = localStorage.getItem('authToken')

async function agregarEdificio(){
    const nombreEdificio = document.getElementById("nombreEdificio").value.trim()
    const plantaEdificio = document.getElementById("plantaEdificio").value.trim()

    try{
        const response = await fetch("http://localhost:1234/edificio/agregar", {
            method: POST,
            headers: {
                "Autorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: {
                nombre: nombreEdificio,
                planta: plantaEdificio
            }
        });
        if(response.ok){
            const data = json(response)
        }
    }
    catch(error){
        return error
    }
}


async function agregarBanio(){
    
}


async function agregarTipoIncidente(){
    
}

addEventListener("submit")