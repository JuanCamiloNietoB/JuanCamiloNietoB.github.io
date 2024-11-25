const LINK = "https://backend-api-mcp3.onrender.com/carts";
// Función para seleccionar una carta aleatoria
function obtenerCartaGacha(cartas) {
    const indiceAleatorio = Math.floor(Math.random() * cartas.length)
    return cartas[indiceAleatorio] // Devuelve una carta aleatoria
}

// Función para generar un color aleatorio en formato hexadecimal
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)]
    }
    return color
}


fetch(`${LINK}`, {
    method: "GET",
    headers: {
        
    }
})
.then(res => res.json())
.then(res => {
    const cardContainer = document.getElementById("card-container")

    // Crear botón de gacha
    const botonGacha = document.createElement('button')
    botonGacha.textContent = "Obtener carta gacha"
    botonGacha.classList.add("btn", "btn-light", "mb-4")
    document.body.insertBefore(botonGacha, cardContainer) // Añadir el botón antes del contenedor de cartas

    // Añadir evento al botón de gacha
    botonGacha.addEventListener('click', () => {
        const carta = obtenerCartaGacha(res) // Obtener una carta al azar

        // Crear la tarjeta usando la estructura de Bootstrap
        const card = document.createElement("div")
        card.classList.add("col-sm-3", "mb-4") // Añade margen entre tarjetas

        // Aplicar un color de fondo aleatorio
        const colorAleatorio = generarColorAleatorio()

        card.innerHTML = `
            <div class="card" style="width: 18rem; background-color: ${colorAleatorio};">
                <img class="card-img-top" src="${carta.images}" alt="Imagen de la tarjeta">
                <div class="card-body">
                    <h5 class="card-title" style="color: white;">${carta.title}</h5>
                    <p class="card-text" style="color: white;">${carta.description}</p>
                    <p class="card-text" style="color: white;"><strong>Valor:</strong> ${carta.value}</p>
                    <button class="btn btn-danger btn-delete">cerrar</button>
                </div>
            </div>
        `

        // Añadir la tarjeta al contenedor
        cardContainer.appendChild(card)

        // Añadir evento al botón de eliminar
        const deleteButton = card.querySelector('.btn-delete')
        deleteButton.addEventListener('click', () => {
            card.remove() // Elimina la tarjeta del DOM
        })
    })
})

