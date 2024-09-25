// Función para seleccionar una carta aleatoria
function obtenerCartaGacha(cartas) {
    const indiceAleatorio = Math.floor(Math.random() * cartas.length)
    return cartas[indiceAleatorio] // Devuelve una carta aleatoria
}

fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
   
    }
}).then(res => res.json())
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
        card.classList.add("col-sm-3", "mb-4", "mx-auto") // Añade margen entre tarjetas

        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${JSON.parse(carta.images)[0]}" alt="Imagen de la tarjeta">
                <div class="card-body">
                    <h5 class="card-title">${carta.title}</h5>
                    <p class="card-text">${carta.description}</p>
                    <p class="card-text"><strong>Valor:</strong> ${carta.value}</p>
                    <button class="btn btn-warning btn-edit">Editar</button>
                    <button class="btn btn-danger btn-delete">Eliminar</button>
                </div>
            </div>
        `

        // Añadir la tarjeta al contenedor
        cardContainer.appendChild(card)

        // Añadir evento al botón de eliminar
        const deleteButton = card.querySelector('.btn-delete')
        deleteButton.addEventListener('click', () => {
            card.remove() // Elimina la tarjeta del DOM
            alert(`Se eliminó la tarjeta con el título: ${carta.title}`)
        })
        
    })
})

function sendForm(){
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const value = document.getElementById("value");
    const image = document.getElementById("image");
    const body ={
      title: title.value,
      description: description.value,
      value: value.value,
      images: [image.value] 
    }
  
fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "POST", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY",
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    title.value = "";
    description.value = "";
    value.value = "";
    image.value = "";
    location.reload();
  })

}

