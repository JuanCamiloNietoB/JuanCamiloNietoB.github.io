/*document.addEventListener("DOMContentLoaded", function () {
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
});*/

const LINK = "https://backend-api-mcp3.onrender.com/users";

document.addEventListener("DOMContentLoaded", function () {
    fetch(`${LINK}`, {
        method: "GET",
        headers: {},
    })
    .then(res => res.json())
    .then(data => {
        // Duplica los datos para formar pares
        const cardsData = [...data, ...data];
        // Mezcla aleatoriamente las tarjetas
        shuffleArray(cardsData);

        // Genera el tablero
        const gameBoard = document.getElementById("game-board");
        cardsData.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("memory-card");
            card.dataset.id = item.id; // Identificador único
            card.innerHTML = `
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="${item.images}" alt="${item.title}">
                </div>
            `;
            gameBoard.appendChild(card);
        });

        // Inicializa la lógica del juego
        initializeGameLogic();
    });
});

// Función para mezclar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*
function initializeGameLogic() {
    const cards = document.querySelectorAll(".memory-card");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flipped");

        if (!hasFlippedCard) {
            // Primer clic
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Segundo clic
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener("click", flipCard));
}*/

function initializeGameLogic() {
    startTimer(); // Inicia el temporizador

    const cards = document.querySelectorAll(".memory-card");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matches = 0; // Contador de pares encontrados

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flipped");

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        matches++;

        if (matches === cards.length / 2) {
            stopTimer(); // Detén el temporizador cuando se encuentren todos los pares
            alert(`¡Juego terminado! Tiempo: ${timer}s. Puntuación: ${score}`);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener("click", flipCard));
}

let timer = 0;
let timerInterval;

function startTimer() {
    const timerDisplay = document.getElementById("timer");
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Tiempo: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}


let score = 0;
let moves = 0; // Número de movimientos realizados

function updateScore(isMatch) {
    const scoreDisplay = document.getElementById("score");

    if (isMatch) {
        score += 100; // Incrementa puntos por un acierto
    } else {
        score -= 10; // Penalización por un intento fallido
    }

    moves++;
    scoreDisplay.textContent = `Puntaje: ${score}`;
}

function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    updateScore(isMatch); // Actualiza el puntaje basado en si hubo coincidencia
    isMatch ? disableCards() : unflipCards();
}
