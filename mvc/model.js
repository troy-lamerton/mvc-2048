export default class Model {
  constructor () {
    console.log('model constructed');
    this.board = [ new Array(4), new Array(4), new Array(4), new Array(4) ];
    this.board.forEach((row) => {
      row.fill(0);
    });
    this.score = 0;
  }

  addRandomNums () {

  }

  up () {

  }

  right () {
    console.log('moving right')
  }

  down () {

  }

  left () {

  }
}