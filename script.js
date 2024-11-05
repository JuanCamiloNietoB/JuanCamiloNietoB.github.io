const LINK = "https://backend-api-mcp3.onrender.com/users";
    let isEditing = false; // Variable global para controlar si estamos en modo edición
    let editingId = null; // Variable para almacenar el id del post que estamos editando

    // Función para enviar el formulario
    function sendForm() {
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const value = document.getElementById("value");
        const images = document.getElementById("images");
        const body = {
            title: title.value,
            description: description.value,
            value: value.value,
            images: images.value
        };

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
    function deletePost(id) {
        fetch(`${LINK}/${id}`, {
            method: "DELETE",
            headers: {},
        })
        .then(res => res.json())
        .then(res => {
            console.log("Post eliminado", res);
            location.reload();
        });
    }

    // Función para resetear el formulario y volver al estado "Crear"
    function resetForm() {
        isEditing = false;
        editingId = null;

        // Cambiar el texto del encabezado a "Crear"
        const formHeading = document.getElementById("form-heading");
        if (formHeading) {
            formHeading.textContent = "Crear";
        }

        // Limpiar los campos del formulario
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("value").value = "";
        document.getElementById("images").value = "";

        location.reload();
    }
document.addEventListener("DOMContentLoaded", function () {
    

    // Función para iniciar la edición de un post
    function editPost(id, title, description, value, images) {
        isEditing = true;
        editingId = id;

        // Cambiar el texto del encabezado a "Editar"
        const formHeading = document.getElementById("form-heading");
        if (formHeading) {
            formHeading.textContent = "Editar";
        } else {
            console.error("Elemento con ID 'form-heading' no encontrado.");
        }

        // Rellenar los campos con los valores del post que estamos editando
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");
        const valueInput = document.getElementById("value");
        const imagesInput = document.getElementById("images");

        if (titleInput && descriptionInput && valueInput && imagesInput) {
            titleInput.value = title;
            descriptionInput.value = description;
            valueInput.value = value;
            imagesInput.value = images;
        } else {
            console.error("Uno o más elementos del formulario no fueron encontrados en el DOM.");
        }
    }

    

    // Cargar los posts y agregar eventos de editar 
    fetch(`${LINK}`, {
        method: "GET",
        headers: {}
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
                editPost(element.id, element.title, element.description, element.value, element.images);
            });

            // Añadir la tarjeta al contenedor
            cardContainer.appendChild(card);
        });
    });
});
