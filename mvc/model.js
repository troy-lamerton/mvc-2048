export default class Model {
  constructor () {
    console.log('model constructed');
    this.board = [ new Array(4), new Array(4), new Array(4), new Array(4) ];
    this.board.forEach((row) => {
      row.fill(0);
    });
    this.score = 0;
  }

  emptyTilesExist () {
    return this.board.some((row) => {
      return row.includes(0);
    })
  }

  addRandomNums (amount = 1) {
    // check there is a space to add a new number
    if (!emptyTilesExist()) return false;
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

  }

  right () {
    console.log('moving right');
    
  }

  down () {

  }

  left () {
    this.board.map((row, rowIndex) => {
      // create an array with all the numbers together
      // and no zeros
      let nonZeroNumbers = row.filter((number) => {
        return number !== 0;
      })

      // row is empty, do nothing
      if (nonZeroNumbers.length === 0) return;


      nonZeroNumbers.reduce((previousNum, currentNum, index, arr) => {
        if (previousNum === currentNum) {
          // double first number
          arr[index-1] = previousNum * 2;
          // remove second number
          arr[index] = 0;
        }
      })

      // may contain zeros now
      // lets filter them out
      nonZeroNumbers = nonZeroNumbers.filter((number) => {
        return number !== 0;
      })

      // fill the rest of the row with zeros
      return row.map((number, index) => {
        if (nonZeroNumbers[index]) {
          return nonZeroNumbers[index];
        } else {
          return 0;
        }
      })

    })
    this.addRandomNums();
  }
}