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
        console.log(element)
        const hijo= document.createElement("li")
        hijo.innerHTML=element.images
        const imagen=document.createElement("img")
        imagen.src=JSON.parse(element.images)[0]
        lista.appendChild(imagen)
    });
    
})
    

