//////// set up ///////
let currentPlayer;
let gameBoard;

let cells = document.getElementsByClassName("cell");
let result = document.getElementById("result");
let playAgainBtn = document.getElementById("play-again");
playAgainBtn.addEventListener("click", function () {
  startNewGame();
});

//adding event listener to every cell in our 3x3 grid
for (let cell of cells) {
  cell.addEventListener("click", function () {
    let id = cell.id;
    let row = parseInt(id[0]);
    let col = parseInt(id[1]);
    cellClicked(row, col);
  });
}

startNewGame();

function startNewGame() {
  currentPlayer = "X";
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let cell of cells) {
    cell.innerText = "";
  }
  playAgainBtn.style.display = "none";
  result.innerText = "";
}

function cellClicked(row, col) {
  if (gameBoard[row][col] == "") {
    //populate the game board 2d array and the HTML element
    gameBoard[row][col] = currentPlayer;
    document.getElementById(`${row}${col}`).innerHTML =
      cellContent(currentPlayer);
    //check if the game finished; if not, next player has their move
    gameFinishConditions();
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  }
}

function cellContent(symbol) {
  return `<h1 class='display-1'>${symbol}</h1>`;
}

//////// checking if (and how) game finished ///////

function gameFinishConditions() {
  if (playerWon(currentPlayer)) {
    result.innerText = `${currentPlayer} won, congrats!`;
    playAgainBtn.style.display = "inline-block";
  } else if (tie()) {
    result.innerText = `It's a tie!`;
    playAgainBtn.style.display = "inline-block";
  }
}

function playerWon(currentPlayer) {
  // check for 3 in a row
  for (let row of gameBoard) {
    if (
      row.every(function (cell) {
        return cell === currentPlayer;
      })
    ) {
      return true;
    }
  }
  //check for 3 in a column
  for (let i = 0; i < gameBoard.length; i++) {
    if (
      gameBoard.every(function (row) {
        return row[i] === currentPlayer;
      })
    ) {
      return true;
    }
  }
  // check for 3 in left-top-right-bottom diagonal
  topLeftToRightDiagonal = true;
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i][i] !== currentPlayer) {
      topLeftToRightDiagonal = false;
      break;
    }
  }
  if (topLeftToRightDiagonal === true) {
    return true;
  }

  // check for 3 in right-top-left-bottom diagonal
  topRightLeftDiagonal = true;
  for (let i = 2; i >= 0; i--) {
    if (gameBoard[i][2 - i] !== currentPlayer) {
      topRightLeftDiagonal = false;
      break;
    }
  }
  if (topRightLeftDiagonal === true) {
    return true;
  }

  //if no win condition was met
  return false;
}

function tie() {
  //check if every cell is populated
  return gameBoard.every(function (row) {
    return row.every(function (cell) {
      return cell !== "";
    });
  });
}
