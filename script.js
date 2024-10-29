//let LINK;
let isEditing = false; // Variable global para controlar si estamos en modo edición
let editingId = null; //Variable para almacenar el id del post que estamos editando

/* Cargar el LINK desde el backend
fetch('/config')
  .then((response) => response.json())
  .then((config) => {
    LINK = config.link;
    // Llama a la función que carga los posts después de establecer LINK
    loadPosts();
  })
  */

const LINK = "https://backend-api-mcp3.onrender.com/users";

// Función para enviar el formulario
function sendForm() {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const value = document.getElementById("value");
    const image = document.getElementById("image");
    const body = {
        title: title.value,
        description: description.value,
        value: value.value,
        images: [image.value]
    };


    // Si estamos en modo edición, se realiza un PATCH
    //https://backend-api-mcp3.onrender.com/users
    if (isEditing) {
        fetch(`${LINK}/${editingId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log("Post actualizado", res);
            resetForm(); // Limpiar el formulario y volver a estado "Crear"
        });
    } else {


        // Si no estamos editando, se realiza un POST
        //https://backend-api-mcp3.onrender.com/users
        fetch(`${LINK}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log("Post creado", res);
            resetForm(); // Limpiar el formulario y mantener el estado "Crear"
        });
    }
}


// Función para eliminar un post
//https://backend-api-mcp3.onrender.com/users

function deletePost(id) {
    fetch(`${LINK}/${id}`, {
        method: "DELETE",
        headers: {
            },
    })
    .then(res => res.json())
    .then(res => {
        console.log("Post eliminado", res);
        location.reload();
    });
}


// Función para iniciar la edición de un post
function editPost(id, title, description, value, image) {
    isEditing = true;
    editingId = id;

    // Cambiar el texto del encabezado a "Editar"
    document.getElementById("form-heading").textContent = "Editar";

    // Rellenar los campos con los valores del post que estamos editando
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("value").value = value;
    document.getElementById("image").value = image;
}

// Función para resetear el formulario y volver al estado "Crear"
function resetForm() {
    isEditing = false;
    editingId = null;

    // Cambiar el texto del encabezado a "Crear"
    document.getElementById("form-heading").textContent = "Crear";

    // Limpiar los campos del formulario
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("value").value = "";
    document.getElementById("image").value = "";

    location.reload();
}


// Código para cargar los posts y agregar eventos de editar 
//https://backend-api-mcp3.onrender.com/users
//function loadPosts() {
fetch(`${LINK}`, {
    method: "GET",
    headers: {
        }
})
.then(res => res.json())
.then(res => {
    console.log(res);

    const cardContainer = document.getElementById("card-container");

    res.forEach(element => {
        // Crear la tarjeta usando la estructura de Bootstrap
        const card = document.createElement("div");
        card.classList.add("col-sm-3", "mb-4"); // Asignar clase de col de Bootstrap
        //{JSON.parse(element.images)[0]}
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${element.images}" alt="Imagen de la tarjeta">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><strong>Fecha:</strong> ${element.value}</p>
                    <button class="btn btn-warning btn-edit">Editar</button>
                    <a onclick="deletePost(${element.id})" class="btn btn-danger">Eliminar</a>
                </div>
            </div>
        `;

        // Añadir el evento de edición al botón "Editar"
        card.querySelector(".btn-edit").addEventListener("click", () => {
            editPost(element.id, element.title, element.description, element.value, JSON.parse(element.images)[0]);
        });

        // Añadir la tarjeta al contenedor
        cardContainer.appendChild(card);
    });
});  //}
