async function cargarOpciones() {
     const selectElement = document.getElementById("ubicacion")

    const response = await fetch("http://localhost:1234/banios",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()

    if(response.ok){
        console.log(data.baniosModificados)
        // Muestra los baños disponibles de la institución
        data.baniosModificados.forEach(banio => {
            let nuevaOpcion = document.createElement('option')
            nuevaOpcion.value = banio.id_bano
            nuevaOpcion.text = banio.ubicacion
            selectElement.appendChild(nuevaOpcion)
            
        });
    }

   

    
}

addEventListener("DOMContentLoaded", ()=>{
    cargarOpciones()
})