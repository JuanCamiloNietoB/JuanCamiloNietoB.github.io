
// Obtener el contenedor de las tarjetas
const cardContainer = document.getElementById("card-container");

// Obtener los campos del formulario
const title = document.getElementById("title");
const description = document.getElementById("description");
const value = document.getElementById("value");
const image = document.getElementById("image");

let editMode = false;
let postIdToEdit = null;  // Guardar el ID del post que se va a editar

// Función para cargar los posts existentes
fetch("https://fake-api-vq1l.onrender.com/posts", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
  }
})
  .then(res => res.json())
  .then(res => {
    console.log(res);
    res.forEach(element => {
      // Crear la tarjeta usando la estructura de Bootstrap
      const card = document.createElement("div");
      card.classList.add("col-sm-3", "mb-4");

      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${JSON.parse(element.images)[0]}" alt="Imagen de la tarjeta">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.description}</p>
            <p class="card-text"><strong>Valor:</strong> ${element.value}</p>
            <a onclick="editPost(${element.id})" class="btn btn-warning">Editar</a>
            <a onclick="deletePost(${element.id})" class="btn btn-danger">Eliminar</a>
          </div>
        </div>
      `
      cardContainer.appendChild(card);
    });
  });

// Función para enviar el formulario
function sendForm() {
  const body = {
    title: title.value,
    description: description.value,
    value: value.value,
    images: [image.value]
  };


  fetch('https://fake-api-vq1l.onrender.com/posts/${id}', {
    method: PATCH,
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY",
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(res => {
      console.log("Respuesta de la API", res);
      resetForm();
      
    });
}

// Función para entrar en el modo de edición
function editPost(id) {
  editMode = true;
  postIdToEdit = post.id;

  // Rellenar el formulario con los datos del post a editar
  title.value = post.title;
  description.value = post.description;
  value.value = post.value;
  image.value = JSON.parse(post.images)[0];
}

// Función para resetear el formulario
function resetForm() {
  title.value = "";
  description.value = "";
  value.value = "";
  image.value = "";
  editMode = false;
  postIdToEdit = null;
}

// Función para eliminar un post
function deletePost(id) {
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
    }
  })
    .then(res => res.json())
    .then(res => {
      location.reload();
    });
}