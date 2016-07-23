import transpose from 'transpose'

export default class Model {
  constructor () {
    this.board = [
      new Array(4),
      new Array(4),
      new Array(4),
      new Array(4)
    ];

    this.board.forEach((row) => {
      row.fill(0);
    });
    this.score = 0;
    this.gameIsOver = false;
    this.gameStatus = 'Use the arrow keys to move the numbers';
  }

  init () {
    this.addRandomNums(2)
  }

  emptyTileExists () {
    return this.board.some((row) => {
      return row.includes(0);
    })
  }

  addRandomNums (amount = 1) {
    // 70% chance new number is a 2
    // 30% new number is a 4
    function twoOrFour () {
      if (Math.random() < 0.7) return 2;
      else return 4;
    }

    function getRandIndex() {
      return Math.floor(Math.random()*4);
    }

    while (amount > 0) {
      // check there is a space to add a new number
      if (!this.emptyTileExists()) return false;

      const newNum = twoOrFour();
      let hasBeenPlaced = false;

      while (!hasBeenPlaced) {
        const row = getRandIndex();
        const cell = getRandIndex();
        if (this.board[row][cell] == 0) {
          this.board[row][cell] = twoOrFour();
          hasBeenPlaced = true;
        }
      }

      amount--;
    }
  }

  checkThenMove (direction) {
    if (this.gameIsOver) return;

    this[direction]();
  }

  up () {
    this.board = transpose(this.board)
    this.moveLeft()
    this.board = transpose(this.board)
  }

  right () {
    this.board.forEach((row) => row.reverse())    
    this.moveLeft()
    this.board.forEach((row) => row.reverse())    
  }

  down () {
    this.board = transpose(this.board)
    this.board.forEach((row) => row.reverse())    
    this.moveLeft()
    this.board.forEach((row) => row.reverse())
    this.board = transpose(this.board)
  }

  left () {
    this.moveLeft();
  }

  moveLeft () {

    function filterZeros (arr) {
      return arr.filter((number) => number !== 0)
    }

    this.board = this.board.map((row, rowIndex) => {
      // create an array with all the numbers together
      // and no zeros
      let shiftedRow = filterZeros(row);

      // row is empty, do nothing
      if (shiftedRow.length === 0) return row;

      shiftedRow.reduce((previousNum, currentNum, index, arr) => {
        if (previousNum === currentNum) {
          // double first number
          arr[index-1] = currentNum * 2;
          // remove second number
          arr[index] = 0;
        }
        return arr[index];
      })

      // may contain zeros now
      // lets filter them out
      // so all numbers are on the left
      shiftedRow = filterZeros(shiftedRow);

      if (shiftedRow.length < row.length) {
        // fill the end of the row with zeros
        const startFilling = shiftedRow.length
        shiftedRow.length = row.length;
        shiftedRow.fill(0, startFilling);
      }

      return shiftedRow;

    })
    this.afterMovement();
  }

  afterMovement () {
    this.addRandomNums(1);
    this.updateScore();
  }

  highestNumber () {
    return Math.max.apply(
      null,
      this.board.map(
        (row) => Math.max.apply(null, row)
      )
    )
  }

  updateScore () {
    this.score = this.highestNumber();
    if (this.score >= 2048) {
      this.gameStatus = 'You win! 2048!!! Keep playing if you wish...'
    } else if (!this.canMove()) {
      this.gameIsOver = true;
      this.gameStatus = 'You can\'t make anymore moves, play again? (Press R)';
    }
  }

  canMove () {
    // check there is at least one zero number
    if (this.emptyTileExists()) return true;

    // check if two adjacent numbers are equal
    /* Iterate over ever number, row by row,
       checking if the tile to the right or below
       is of equal value
     */
    return this.board.some((row, rowIndex, board) => {
      return row.some((num, numIndex, numArray) => {
        if (rowIndex < board.length-1) {
          // check number below (+1)
          if (num === board[rowIndex+1][numIndex]) return true
        }

        if (numIndex < numArray.length-1) {
          // check number to right (+1)
          if (num === numArray[numIndex+1]) return true;
        }
        return false
      })
    })
  }
}