const player = document.getElementById('player')
const beyonce = document.getElementById('beyonce')
const gameArea = document.getElementById('game-area')

const botonJugar = document.querySelector('.btn-jugar')
const puntajeVal = document.getElementById('puntaje-val')

const sonidoMoneda = new Audio('moneda_sonido.mp3')
sonidoMoneda.volume = 0.6

const sonidoMuerte = new Audio('muerte.mp3')
sonidoMuerte.volume = 0.6

const imagenesPersonaje = {
    rufflesAzules: 'ruffles2.png',
    rufflesVerdes: 'ruffles-queso.png',
    rufflesRojas: 'ruffles-roja.png'
};

//Personaje segun la eleccion del jugador
document.querySelectorAll('input[name="personaje"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        player.style.backgroundImage = `url('${imagenesPersonaje[radio.value]}')`;
    });
});

let juegoActivo = false
let playerSpeed = 40
let beyonceSpeed = 1

let playerPosition = { x: 100, y: 100 }
let beyoncePosition = { x: 300, y: 300 }
let score = 0
let monedaPosition = {
    x: 0,
    y: 0
};
let moneda = null


window.addEventListener('keydown', (event) => {
    if (!juegoActivo) return; // Solo se puedo jugar si el juego esta activo (valga la redundancia)
    if (event.key.startsWith('Arrow')) event.preventDefault();

    switch (event.key) {
        case 'ArrowUp':
            playerPosition.y = Math.max(0, playerPosition.y - playerSpeed)
            break;
        case 'ArrowDown':
            playerPosition.y = Math.min(gameArea.clientHeight - 50, playerPosition.y + playerSpeed)
            break;
        case 'ArrowLeft':
            playerPosition.x = Math.max(0, playerPosition.x - playerSpeed)
            break;
        case 'ArrowRight':
            playerPosition.x = Math.min(gameArea.clientWidth - 50, playerPosition.x + playerSpeed)
            break;
    }
    updatePositions()
});

// Para mover a chips
function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed
    }

    updatePositions()
    checkCollision()
}


function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`; 
}

//Para cuando el jugador muera
function checkCollision() {
    if (Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
    Math.abs(playerPosition.y - beyoncePosition.y) < 50) {
        juegoActivo = false;
        sonidoMuerte.currentTime = 0
        sonidoMuerte.play()

        alert('¡Chips te atrapó!')

    playerPosition = { x: 100, y: 100 }
    beyoncePosition = { x: 300, y: 300 }
    }
}

//Crea una papa/moneda
function crearMoneda() {

    moneda = document.createElement('div')

    moneda.classList.add('moneda')

    gameArea.appendChild(moneda)

   
    const maxX = gameArea.clientWidth - 30
    const maxY = gameArea.clientHeight - 30

    // Posicion aleatoria
    monedaPosition.x = Math.random() * maxX
    monedaPosition.y = Math.random() * maxY

    moneda.style.transform =
        `translate(${monedaPosition.x}px, ${monedaPosition.y}px)`
}

//Detecta cuando el jugador tomo una moneda
function checkmonedaCollision() {

    const distanceX =
        Math.abs(playerPosition.x - monedaPosition.x)

    const distanceY =
        Math.abs(playerPosition.y - monedaPosition.y)

    if (distanceX < 40 && distanceY < 40) {

        score++;

        sonidoMoneda.currentTime = 0
        sonidoMoneda.play()
        puntajeVal.textContent = score

        // console.log(`Puntos: ${score}`);

        moneda.remove()

        crearMoneda()
    }
}

function iniciarJuego() {
    if (juegoActivo) return // evita que se dupliquen los ciclos si presionan jugar dos veces

    juegoActivo = true
    score = 0
    puntajeVal.textContent = score

    playerPosition = { x: 100, y: 100 }
    beyoncePosition = { x: 300, y: 300 }

    if (moneda) moneda.remove() // quita la papa anterior si existía
    crearMoneda()
    updatePositions()

    requestAnimationFrame(gameLoop)
}

botonJugar.addEventListener('click', () => {
    iniciarJuego()
    botonJugar.blur() // para que Enter o espacio no vuelvan a presionar el botón
});

function gameLoop() {
    if (!juegoActivo) return

    moveBeyonce()
    checkmonedaCollision()
    requestAnimationFrame(gameLoop)
}

gameLoop()
crearMoneda()


console.log("hola");

const inputVelJugador = document.getElementById('input-player-speed');
const valVelJugador = document.getElementById('val-player-speed');
const inputVelEnemigo = document.getElementById('input-enemy-speed');
const valVelEnemigo = document.getElementById('val-enemy-speed');

inputVelJugador.addEventListener('input', () => {
    playerSpeed = Number(inputVelJugador.value);
    valVelJugador.textContent = playerSpeed;
});

inputVelEnemigo.addEventListener('input', () => {
    beyonceSpeed = Number(inputVelEnemigo.value);
    valVelEnemigo.textContent = beyonceSpeed;
});


//codigo konami
const codigoSecreto = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let progresoCodigo = 0; // cuántas teclas de la secuencia lleva bien el jugador

window.addEventListener('keydown', (event) => {
    if (event.key === codigoSecreto[progresoCodigo]) {
        progresoCodigo++;

        if (progresoCodigo === codigoSecreto.length) {
            activarEasterEgg();
            progresoCodigo = 0;
        }
    } else {
        // si falla, reinicia (pero cuenta la tecla actual si era la primera de la secuencia)
        progresoCodigo = event.key === codigoSecreto[0] ? 1 : 0;
    }
});



function activarEasterEgg() {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1', '_blank');
}

updatePositions();