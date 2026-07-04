const submit = document.getElementById("submit");
const form = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";

const board = Array(9).fill("");

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

submit.addEventListener("click", function () {
   player1 = document.getElementById("player1").value.trim();
player2 = document.getElementById("player2").value.trim();

    if (!player1 || !player2) return;

    form.style.display = "none";
    game.style.display = "block";

    currentPlayer = player1;
    currentSymbol = "X";

    message.textContent = `${currentPlayer}, you're up`;
});

document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", function () {

        if (board[index] !== "") return;

        board[index] = currentSymbol;
        cell.textContent = currentSymbol;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} congratulations you won!`;
            return;
        }

        if (board.every(x => x !== "")) {
            message.textContent = "It's a draw!";
            return;
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
            currentSymbol = "O";
        } else {
            currentPlayer = player1;
            currentSymbol = "X";
        }

        message.textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        );
    });
}