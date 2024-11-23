const LINK = "https://backend-api-mcp3.onrender.com/users";
let cards = []; // Arreglo global para almacenar las cartas

    // Obtener cartas desde el backend
    fetch(`${LINK}`, {
        method: "GET",
        headers: {}
    })
        .then(res => res.json())
        .then(res => {
            cards = res; // Guardamos las cartas en el arreglo global
            renderCards(res); // Renderizamos las cartas en la interfaz
        })
        .catch(err => console.error("Error al obtener las cartas:", err));

document.addEventListener("DOMContentLoaded", function () {

    
    
    // Función para renderizar las cartas en el contenedor
    function renderCards(cards) {
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = ""; // Limpiar contenedor antes de renderizar
    
        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("col-sm-3", "mb-4");
            cardElement.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${card.images}" alt="${card.title}">
                    <div class="card-body">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.description}</p>
                    </div>
                </div>
            `;
            cardContainer.appendChild(cardElement);
        });
    }
    
    // Función para seleccionar y mostrar dos cartas
    function selectRandomCards() {
        if (cards.length < 2) {
            alert("No hay suficientes cartas para jugar.");
            return;
        }
    
        // Seleccionar dos cartas al azar
        const card1 = cards[Math.floor(Math.random() * cards.length)];
        const card2 = cards[Math.floor(Math.random() * cards.length)];
    
        // Mostrar las cartas en la zona de comparación
        const comparisonZone = document.getElementById("comparison-zone");
        comparisonZone.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${card1.images}" alt="${card1.title}">
                <div class="card-body">
                    <h5 class="card-title">${card1.title}</h5>
                    <p class="card-text">${card1.description}</p>
                    <p class="card-text"><strong>Imagen:</strong> ${card1.images}</p>
                </div>
            </div>
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${card2.images}" alt="${card2.title}">
                <div class="card-body">
                    <h5 class="card-title">${card2.title}</h5>
                    <p class="card-text">${card2.description}</p>
                    <p class="card-text"><strong>Imagen:</strong> ${card2.images}</p>
                </div>
            </div>
        `;
    
        // Comparar las cartas
        compareCards(card1, card2);
    }
    
    // Comparar cartas basadas en las URLs de las imágenes
    function compareCards(card1, card2) {
        const result = document.getElementById("result");
    
        // Comparar las URLs de las imágenes
        if (card1.images > card2.images) {
            result.textContent = `¡${card1.title} gana! Su imagen (${card1.images}) tiene una URL "mayor" en orden alfabético.`;
        } else if (card1.images < card2.images) {
            result.textContent = `¡${card2.title} gana! Su imagen (${card2.images}) tiene una URL "mayor" en orden alfabético.`;
        } else {
            result.textContent = `¡Es un empate! Ambas cartas tienen la misma URL de imagen (${card1.images}).`;
        }
    }
    
    // Asignar el evento al botón de comparación
    document.getElementById("compare-button").addEventListener("click", selectRandomCards);
    
})