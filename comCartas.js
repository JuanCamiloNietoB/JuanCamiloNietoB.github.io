
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
            alert(`¡Juego terminado! Tiempo: ${timer}s.`);
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
}*/

function initializeGameLogic() {
    startTimer(); // Comienza el temporizador al inicio del juego
    updateMoves(); // Muestra el número inicial de movimientos

    const cards = document.querySelectorAll(".memory-card");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matches = 0; // Contador de pares encontrados

    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        matches++;

        if (matches === cards.length / 2) {
            stopTimer();
            setTimeout(() => alert(`¡Felicidades! Has completado el juego en ${timer}s.`), 500);
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

let totalMoves = 20; // Límite de movimientos
let movesRemaining = totalMoves; // Movimientos restantes

function updateMoves() {
    const movesDisplay = document.getElementById("moves-remaining");
    movesDisplay.textContent = `Movimientos restantes: ${movesRemaining}`;
}

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

    // Reduce los movimientos restantes
    movesRemaining--;
    updateMoves();

    // Verifica si se han agotado los movimientos
    if (movesRemaining === 0) {
        stopTimer(); // Detén el temporizador si está en uso
        setTimeout(() => {
            alert("¡Se han agotado tus movimientos! Fin del juego.");
            resetGame(); // Reinicia el juego (definido más adelante)
        }, 500);
    }
}

function resetGame() {
    // Reinicia el estado del tablero y las variables del juego
    movesRemaining = totalMoves;
    updateMoves();

    const cards = document.querySelectorAll(".memory-card");
    cards.forEach(card => card.classList.remove("flipped"));

    initializeGameLogic();
}


