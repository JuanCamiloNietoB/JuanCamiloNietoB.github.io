let isEditing = false; // Variable global para controlar si estamos en modo edición
let editingId = null; // Variable para almacenar el id del post que estamos editando

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

    // Si estamos en modo edición, se realiza un PUT
    if (isEditing) {
        fetch(`https://fake-api-vq1l.onrender.com/posts/${editingId}`, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY",
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
        fetch("https://fake-api-vq1l.onrender.com/posts", {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY",
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
function deletePost(id) {
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
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
fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE5LCJlbWFpbCI6Imp1YW5jYW1pbG8ubmlldG9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNTY3Mzg2MywiZXhwIjoxNzQyOTUzODYzfQ.3u6m6ab9h55hrm5720C1lEX6QgupHuJQZXcsYMEaOGY"
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

        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${JSON.parse(element.images)[0]}" alt="Imagen de la tarjeta">
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
});
