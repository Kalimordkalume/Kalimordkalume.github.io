// DOM REFERENCES
const $gameBoard = document.getElementById("gameBoard");
const $boardSizeFromSettings = document.getElementById("boardSize");
let boardSize = Number($boardSizeFromSettings.value);
const $turnShow = document.getElementById("currentTurn");
let turnoActual = "user1";
let user1Color = document.getElementById("user1ColorPicker").value;
let user2Color = document.getElementById("user2ColorPicker").value;
let currentTurn = document.getElementById("currentTurn").innerHTML;
let user1Name = document.getElementById("userName1Value").value;
let user2Name = document.getElementById("userName2Value").value;

function initListeners() {
    document.getElementById("user1ColorPicker").addEventListener("input", (e) => {
        user1Color = e.target.value;
    })
    document.getElementById("user2ColorPicker").addEventListener("input", (e) => {
        user2Color = e.target.value;
    })

    document.getElementById("userName1Value").addEventListener("input", (e) => {
        user1Name = e.target.value

    })

    document.getElementById("userName2Value").addEventListener("input", (e) => {
        user2Name = e.target.value

    })

    document.getElementById("userName1").innerHTML = user1Name;
    document.getElementById("userName2").innerHTML = user2Name;

}



function addListenersToSettingsPannel() {
    $boardSizeFromSettings.addEventListener("change", () => {
        boardSize = Number($boardSizeFromSettings.value);
        $gameBoard.innerHTML = "";
        buildGameBoard();

    })


}

function changeTurn() {
    initListeners();
    if (turnoActual === "user1") {
        turnoActual = "user2";
        $turnShow.innerHTML = user2Name;


    } else if (turnoActual === "user2") {
        turnoActual = "user1";

        $turnShow.innerHTML = user1Name;
    }


}
function buildCells() {
    const filas = $gameBoard.childNodes;

    filas.forEach(fila => {
        for (let i = 0; i < boardSize; i++) {
            let celda = document.createElement("div");
            celda.className = "game-cell";
            fila.appendChild(celda);
        }
    });
}
function attachCellListeners() {
    const celdas = document.querySelectorAll(".game-cell");

    celdas.forEach(celda => {
        celda.addEventListener("click", computeCellStatus()

        );
    });
}



function buildGameBoard() {
    buildTableRows(boardSize);
    buildCells();
    attachCellListeners();
}

function buildTableRows(boardSize) {
    for (let i = 0; i < boardSize; i++) {
        let fila = document.createElement("div");
        fila.className = "table-row";

        $gameBoard.appendChild(fila);

    }
}





function main() {
    initListeners();
    addListenersToSettingsPannel();
    buildGameBoard();
}

main();