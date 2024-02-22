// Game start
// X is the current player
// After each click on the board, current_player changes

// JavaScript
let currentPlayer = "X";
let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let cells = document.getElementsByClassName("cell");

for (let cell of cells) {
  cell.addEventListener("click", function () {
    let id = cell.id;
    let row = parseInt(id[0]);
    let col = parseInt(id[1]);
    console.log(id, row, col);
    cellClicked(row, col);
  });
}

function cellClicked(row, col) {
  if (gameBoard[row][col] == "") {
    gameBoard[row][col] = currentPlayer;
    document.getElementById(`${row}${col}`).innerHTML =
      cellContent(currentPlayer);
    console.log(currentPlayer);
    console.log(gameBoard);
    // check_winning_conditions();
    check_for_tie();
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  }
}

function cellContent(symbol) {
  return `<h1 class='display-1'>${symbol}</h1>`;
}

function check_winning_conditions(currentPlayer, gameBoard) {
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
    if (gameBoard[i][i] !== currentPlayer) {
      topRightLeftDiagonal = false;
      break;
    }
  }
  if (topRightLeftDiagonal === true) {
    return true;
  }

  // TO PRZYWROC
  return false;
}

// tests
let testGameBoard = [
  ["O", "O", "X"],
  ["X", "O", "O"],
  ["O", "O", "X"],
];

console.log(check_winning_conditions("O", testGameBoard));

function check_for_tie() {
  return gameBoard.every(function (row) {
    return row.every(function (cell) {
      return cell !== "";
    });
  });
}

function correct_column() {
  // Correct, working
  for (let i = 0; i < gameBoard.length; i++) {
    let temporaryColumn = [];
    for (let row of gameBoard) {
      temporaryColumn.push(row[i]);
    }
    console.log(temporaryColumn);
    if (
      temporaryColumn.every(function (cell) {
        return cell === currentPlayer;
      })
    ) {
      return true;
    }
  }
}
