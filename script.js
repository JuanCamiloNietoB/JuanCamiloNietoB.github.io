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
                    <a onclick="deletePost(${element.id})" class="btn btn-danger">Eliminar</a>
                </div>
            </div>
        `

        // Añadir la tarjeta al contenedor
        cardContainer.appendChild(card)
        
        
        
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

function deletePost(id){
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "DELETE", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
    },
  })
  .then( res => res.json())
  .then( res => {
    location.reload();
  })
}