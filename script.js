//your JS code here. If required.
const submit = document.getElementById("submit");
const start = document.getElementById("start");
const game = document.getElementById("game");

const p1Input = document.getElementById("player-1");
const p2Input = document.getElementById("player-2");

const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";

let current = "X";
let board = Array(9).fill("");

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

submit.addEventListener("click", () => {

    player1 = p1Input.value.trim();
    player2 = p2Input.value.trim();

    if(player1==="" || player2==="") return;

    start.style.display="none";
    game.style.display="block";

    message.textContent=`${player1}, you're up`;
});

cells.forEach((cell,index)=>{

    cell.addEventListener("click",()=>{

        if(board[index]!=="" || checkWinner()) return;

        board[index]=current;
        cell.textContent=current;

        if(checkWinner()){

            const winner=current==="X"?player1:player2;
            message.textContent=`${winner} congratulations you won!`;
            return;
        }

        current=current==="X"?"O":"X";

        message.textContent=current==="X"
        ?`${player1}, you're up`
        :`${player2}, you're up`;

    });

});

function checkWinner(){

    for(let combo of wins){

        const [a,b,c]=combo;

        if(
            board[a] &&
            board[a]===board[b] &&
            board[b]===board[c]
        ){
            return true;
        }
    }

    return false;
}