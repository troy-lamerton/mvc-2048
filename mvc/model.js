import transpose from 'transpose'

export default class Model {
  constructor () {
    console.log('model constructed');
    this.board = [ new Array(4), new Array(4), new Array(4), new Array(4) ];
    this.board.forEach((row) => {
      row.fill(0);
    });
    this.score = 0;
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

  up () {
    // transpose array
    this.board = transpose(this.board)
    this.moveLeft()
    // transpose array
    this.board = transpose(this.board)
  }

  right () {
    this.board.forEach((row) => row.reverse())    
    this.moveLeft()
    this.board.forEach((row) => row.reverse())    
  }

  down () {

  }

  left () {
    this.moveLeft();
  }

  moveLeft () {
    this.board = this.board.map((row, rowIndex) => {
      // create an array with all the numbers together
      // and no zeros
      let nonZeroNumbers = row.filter((number) => number !== 0)

      // row is empty, do nothing
      if (nonZeroNumbers.length === 0) return row;

      nonZeroNumbers.reduce((previousNum, currentNum, index, arr) => {
        if (previousNum === currentNum) {
          // double first number
          arr[index-1] = currentNum * 2;
          // remove second number
          arr[index] = 0;
        }
        return currentNum
      })

      // may contain zeros now
      // lets filter them out
      nonZeroNumbers = nonZeroNumbers.filter((number) => {
        return number !== 0;
      })

      if (nonZeroNumbers.length < row.length) {
        // fill the rest of the row with zeros
        const startFilling = nonZeroNumbers.length
        nonZeroNumbers.length = row.length;
        nonZeroNumbers.fill(0, startFilling);
      }

      return nonZeroNumbers;

    })
    this.afterMovement();
  }

  afterMovement () {
    this.addRandomNums();
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
  }
}