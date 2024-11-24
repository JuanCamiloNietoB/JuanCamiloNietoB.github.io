document.addEventListener("DOMContentLoaded", function () {
    const LINK = "https://backend-api-mcp3.onrender.com/users";
    const cardContainer = document.getElementById("card-container");
    const attemptsCounter = document.getElementById("attempts-counter"); // Mostrar intentos
    const maxAttempts = 15; // Límite de intentos
    let attempts = 0; // Contador de intentos
    let matchedPairs = 0; // Contador de pares encontrados
    let firstCard = null; // Primera tarjeta seleccionada

    // Función para mezclar las tarjetas
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Función para actualizar el contador de intentos
    function updateAttemptsCounter() {
        attemptsCounter.textContent = `Intentos: ${attempts}/${maxAttempts}`;
    }

    // Función para renderizar las tarjetas en el contenedor
    function renderCards(cards) {
        cardContainer.innerHTML = ""; // Limpiar contenedor
    
        // Duplicar y mezclar tarjetas para crear pares
        const pairs = shuffle([...cards, ...cards]);
    
        pairs.forEach((cardData, index) => {
            const card = document.createElement("div");
            card.classList.add("col-sm-3", "mb-4"); // Bootstrap styling
            card.innerHTML = `
                <div class="card memory-card" data-id="${cardData.id}" style="width: 100%; height: 200px;">
                    <div class="card-front" style="background: #f8f9fa;"></div>
                    <div class="card-back">
                        <img src="${cardData.images}" alt="Tarjeta" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>
            `;
            cardContainer.appendChild(card);
    
            // Añadir evento de clic para las tarjetas
            card.addEventListener("click", () => handleCardClick(card, cardData));
        });
    }
    

    // Función para manejar clics en las tarjetas
    function handleCardClick(card, cardData) {
        // Si ya fue emparejada o está siendo comparada, ignorar
        if (card.classList.contains("matched") || card === firstCard || card.classList.contains("flipped")) return;

        // Mostrar la tarjeta
        card.classList.add("flipped");

        if (!firstCard) {
            // Si es la primera tarjeta seleccionada
            firstCard = card;
        } else {
            // Segunda tarjeta seleccionada
            attempts++;
            updateAttemptsCounter();
            const secondCard = card;

            // Comparar las dos tarjetas seleccionadas
            const isMatch = firstCard.dataset.id === secondCard.dataset.id;

            if (isMatch) {
                // Si coinciden, marcarlas como emparejadas
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                matchedPairs++;

                // Revisar condición de victoria
                if (matchedPairs === cardContainer.children.length / 2) {
                    setTimeout(() => alert("¡Ganaste!"), 500);
                }
            } else {
                // Si no coinciden, voltearlas nuevamente
                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                }, 1000);
            }

            firstCard = null; // Reiniciar la selección
        }

        // Verificar intentos restantes
        if (attempts >= maxAttempts) {
            setTimeout(() => alert("Has alcanzado el límite de intentos. ¡Inténtalo de nuevo!"), 500);
            resetGame();
        }
    }

    // Función para reiniciar el juego
    function resetGame() {
        attempts = 0;
        matchedPairs = 0;
        firstCard = null;
        updateAttemptsCounter(); // Reiniciar contador en pantalla
        fetchCards(); // Volver a cargar las cartas
    }

    // Función para obtener las cartas del backend
    function fetchCards() {
        fetch(`${LINK}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                const cards = res.map((item) => ({
                    id: item.id,
                    images: item.images,
                }));
                renderCards(cards);
                updateAttemptsCounter(); // Inicializar contador
                console.log(res);
            })
            .catch((err) => console.error("Error al obtener las cartas:", err));
    }

    // Iniciar el juego
    fetchCards();
});
