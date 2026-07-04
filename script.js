const submit = document.getElementById("submit");
const game = document.getElementById("game");
const form = document.getElementById("player-form");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";

let currentPlayer = "";
let currentSymbol = "x";

const board = Array(9).fill("");

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

  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if(player1 === "" || player2 === ""){
    return;
  }

  form.style.display = "none";
  game.style.display = "block";

  currentPlayer = player1;
  currentSymbol = "x";

  message.textContent = `${player1}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach((cell,index)=>{

  cell.addEventListener("click",()=>{

    if(board[index] !== ""){
      return;
    }

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if(checkWinner()){
      message.textContent = `${currentPlayer} congratulations you won!`;
      return;
    }

    if(board.every(v=>v!=="")){
      message.textContent="It's a draw!";
      return;
    }

    if(currentSymbol==="x"){
      currentSymbol="o";
      currentPlayer=player2;
    }else{
      currentSymbol="x";
      currentPlayer=player1;
    }

    message.textContent=`${currentPlayer}, you're up`;

  });

});

function checkWinner(){

  for(const pattern of wins){

    const [a,b,c]=pattern;

    if(
      board[a]!=="" &&
      board[a]===board[b] &&
      board[b]===board[c]
    ){
      return true;
    }

  }

  return false;
}