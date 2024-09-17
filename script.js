/*
console.log("hola mundo")

fetch("https://fake-api-vq1l.onrender.com/posts",{
    method:"GET",
    headers:{
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
    }
}).then(res => res.json()).then(res => {

    console.log(res)

    const lista = document.getElementById("lista")
    
    res.forEach(element => {
        // Crear un elemento <li> para el título
        const item = document.createElement("li")
        item.textContent = `Título: ${element.title}` // Asignar el título
        lista.appendChild(item)

        // Crear un elemento <p> para la descripción
        const descripcion = document.createElement("p")
        descripcion.textContent = `Descripción: ${element.description}` // Asignar la descripción
        lista.appendChild(descripcion)

        // Crear un elemento <p> para el valor
        const valor = document.createElement("p")
        valor.textContent = `Valor: ${element.value}` // Asignar el valor
        lista.appendChild(valor)

        // Crear y mostrar la(s) imagen(es)
        const imagenes = JSON.parse(element.images)
        imagenes.forEach(imgSrc => {
            const imagen = document.createElement("img")
            imagen.src = imgSrc
            lista.appendChild(imagen)})
    });
    
})
    
*/

console.log("hola mundo")

fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
   
    }
}).then(res => res.json())
.then(res => {
    console.log(res)

    const cardContainer = document.getElementById("card-container")

    res.forEach(element => {
        // Crear la tarjeta usando la estructura de Bootstrap
        const card = document.createElement("div")
        card.classList.add("col-sm-3", "mb-4") // Asignar clase de col de Bootstrap

        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${JSON.parse(element.images)[0]}" alt="Imagen de la tarjeta">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><strong>Valor:</strong> ${element.value}</p>
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
            alert(`Se eliminó la tarjeta con el título: ${element.title}`)
        })

        // Añadir evento al botón de editar (ejemplo básico)
        const editButton = card.querySelector('.btn-edit')
        editButton.addEventListener('click', () => {
            const newTitle = prompt('Editar título:', element.title)
            if (newTitle) {
                element.title = newTitle // Actualiza el valor en el objeto (esto solo es en el frontend)
                card.querySelector('.card-title').textContent = newTitle // Actualiza el título en la tarjeta
            }
        })
    })
})