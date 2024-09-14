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
    

