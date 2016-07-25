import tableify from 'tableify'

export default class View {
  constructor () {

  }

  init (model) {
    this.render(model)
  }
  render (model) {

    const replacedZerosBoard = model.board.map((row) => {
      return row.map((num) => {
        if (num === 0) return '';
        else return num;
      })
    });
    const htmlTable = tableify(replacedZerosBoard);

    const score = document.createElement('p');
    score.className = 'score';
    score.innerHTML = 'Score: ' + model.score.toString();

    const message = document.createElement('p');
    message.innerHTML = model.gameStatus;
    
    document.querySelector('#game').innerHTML = '';

    document.querySelector('#game').appendChild(score)
    document.querySelector('#game').innerHTML += (htmlTable);
    document.querySelector('#game').appendChild(message)
        
  }


}