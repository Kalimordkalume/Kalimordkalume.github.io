// DOM REFERENCES

// USER NODES
const $user1Name = document.getElementById("userName1");
const $user2Name = document.getElementById("userName2");
const $user1Score = document.getElementById("user1Score");
const $user2Score = document.getElementById("user2Score");
const $user1Color = document.getElementById("user1ColorPicker");
const $user2Color = document.getElementById("user2ColorPicker");
// GENERAL NODES
const $startBtn = document.getElementById("startGameBtn");
const $resetBtn = document.getElementById("resetGameBtn");

// BOARD NODES

const $gameBoard = document.getElementById("gameBoard");

// SETTINGS NODES
const $userName1Input = document.getElementById("userName1Input");
const $userName2Input = document.getElementById("userName2Input");

const $soundEffectsInput = document.getElementById("soundEffectsInput");
const $musicEffectsInput = document.getElementById("musicEffectsInput");

const $difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
const $saveModeStatus = document.getElementById("saveModeStatus");

const $turnDurationInput = document.getElementById("turnDuration");
const $turnDurationTimeStamp = document.getElementById("turnDurationTimeStamp");

const $boardSizeInput = document.getElementById("boardSizeInput");


// GLOBAL DYNAMIC VARIABLES
let firstPlayer = $userName1Input.value;
let secondPlayer = $userName2Input.value;
let boardSize = $boardSizeInput.value;
let currentPlayer;



function initSettingsListeners() {
    // Nombres de usuario
    $userName1Input.addEventListener("input", () => {
        firstPlayer = $userName1Input.value;
        $user1Name.innerHTML = firstPlayer;
    });

    $userName2Input.addEventListener("input", () => {
        secondPlayer = $userName2Input.value;
        $user2Name.innerHTML = secondPlayer;
    });

    // Tamaño del tablero
    $boardSizeInput.addEventListener("change", () => {
        boardSize = Number($boardSizeInput.value);
        $gameBoard.innerHTML = "";
        buildGameBoard();
    });

    listenToResetBtn();


}


function listenToResetBtn() {
    $resetBtn.addEventListener("click", () => {
        $gameBoard.innerHTML = "";
        document.getElementById("currentTurn").innerHTML = firstPlayer;
        startGame();

    })


}


function buildTableRows(boardSize) {
    for (let i = 0; i < boardSize; i++) {
        let fila = document.createElement("div");
        fila.className = "table-row";

        $gameBoard.appendChild(fila);

    }
}

function buildGameBoard() {
    buildTableRows(boardSize);
    buildCells();

}

function buildCells() {
    const filas = $gameBoard.childNodes;

    filas.forEach(fila => {
        for (let i = 0; i < boardSize; i++) {
            let celda = document.createElement("div");
            celda.className = "game-cell";
            celda.style.backgroundColor = "rgba(0, 0, 0, 0)";
            fila.appendChild(celda);
        }
    });
}
function calcularIndiceCelda(celda) {
    let filaCelda = Array.from(celda.parentElement.children);
    let celdaIndex = filaCelda.indexOf(celda);
    return celdaIndex;
}

function calcularIndiceFilaSegunCelda(celda) {
    let filaPadre = celda.parentElement;
    let padre = Array.from(filaPadre.parentElement.children);

    let indiceFila = padre.indexOf(filaPadre);
    return indiceFila;
}



function calcularCeldaAbajo(celda) {
    const indiceCelda = calcularIndiceCelda(celda);
    const indiceFila = calcularIndiceFilaSegunCelda(celda);


    if (indiceFila < $gameBoard.children.length - 1) {
        const filaAbajo = $gameBoard.children[indiceFila + 1];
        return filaAbajo.children[indiceCelda];
    }
    return null;
}

function calcularCeldaIzda(celda) {
    if (celda.previousElementSibling) {
        return celda.previousElementSibling;
    }
    return null;
}

function calcularCeldaDcha(celda) {
    if (celda.nextElementSibling) {
        return celda.nextElementSibling;
    }
    return null;
}

function calcularCeldaArriba(celda) {
    const indiceCelda = calcularIndiceCelda(celda);
    const indiceFila = calcularIndiceFilaSegunCelda(celda);


    if (indiceFila > 0) {
        const filaArriba = $gameBoard.children[indiceFila - 1];
        return filaArriba.children[indiceCelda];
    }
    return null;
}


function attachCellListeners() {
    const celdas = document.querySelectorAll(".game-cell");

    function isCeldaVacia(celda) {
        return getComputedStyle(celda).backgroundColor === "rgba(0, 0, 0, 0)";
    }

    function isColor(celda, rgbColor) {
        return celda && getComputedStyle(celda).backgroundColor === rgbColor;
    }

    function intentarCapturar(celdaMedio, getOtraCelda, colorJugador, colorRival) {
        if (!celdaMedio || !isColor(celdaMedio, colorRival)) return;

        const celdaFinal = getOtraCelda(celdaMedio);
        if (celdaFinal && isColor(celdaFinal, colorJugador)) {
            celdaMedio.style.backgroundColor = colorJugador;
        }
    }

    celdas.forEach(celda => {
        celda.addEventListener("click", () => {
            const colorJugador = hexToRgbString(currentPlayer === "user1" ? $user1Color.value : $user2Color.value);
            const colorRival = hexToRgbString(currentPlayer === "user1" ? $user2Color.value : $user1Color.value);

            if (!isCeldaVacia(celda)) return;


            if (calcularCeldaIzda(celda)) intentarCapturar(calcularCeldaIzda(celda), calcularCeldaIzda, colorJugador, colorRival);
            if (calcularCeldaDcha(celda)) intentarCapturar(calcularCeldaDcha(celda), calcularCeldaDcha, colorJugador, colorRival);
            if (calcularCeldaArriba(celda)) intentarCapturar(calcularCeldaArriba(celda), calcularCeldaArriba, colorJugador, colorRival);
            if (calcularCeldaAbajo(celda)) intentarCapturar(calcularCeldaAbajo(celda), calcularCeldaAbajo, colorJugador, colorRival);


            celda.style.backgroundColor = colorJugador;


            currentPlayer = currentPlayer === "user1" ? "user2" : "user1";
            document.getElementById("currentTurn").textContent =
                currentPlayer === "user1" ? $userName1Input.value : $userName2Input.value;

        });
    });
}


function hexToRgbString(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}



function startGame() {
    buildGameBoard();
    currentPlayer = "user1";
    attachCellListeners();


}


function init() {
    initSettingsListeners();
    $user1Name.innerHTML = firstPlayer;
    $user2Name.innerHTML = secondPlayer;
    buildGameBoard();
    attachCellListeners();
    $startBtn.addEventListener("click", () => {
        $gameBoard.innerHTML = "";
        startGame();


    })



}


function main() {
    init();


}

main();