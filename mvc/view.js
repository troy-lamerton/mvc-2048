import Table from 'cli-table'
import clear from 'clear'
import colors from 'colors'
import tableify from 'tableify'

export default class View {
  constructor () {
    this.table = new Table({});
  }

  init (model) {
    this.render(model)
  }
  render (model) {
    switch (global.platform) {
      case 'console':

        // change color of zeros
        const formattedBoard = model.board.map((row) => {
          return row.map((number) => {
            if (number === 0) return number.toString().black 
            else return number.toString();
          })
        })

        this.table = new Table({
          colAligns: new Array(4).fill('middle'),
        });
        this.table.push(...formattedBoard);

        clear();
        console.log(this.table.toString());
        
        const line = '-------------------------';
        
        console.log((model.gameIsOver)?line.red:line);

        const scoreString = (model.score >= 2048) ? 
          model.score.toString().bold.green :
          model.score.toString().yellow
        console.log('Score:', scoreString);
        console.log('\n', model.gameStatus.bold);
        break;

      case 'browser':
        const removedZerosBoard = model.board.map((row) => {
          return row.map((num) => {
            if (num === 0) return '';
            else return num;
          })
        });
        const htmlTable = tableify(removedZerosBoard);

        const score = document.createElement('p');
        score.className = 'score';
        score.innerHTML = 'Score: ' + model.score.toString();

        const message = document.createElement('p');
        message.innerHTML = model.gameStatus;
        
        document.querySelector('#game').innerHTML = '';

        document.querySelector('#game').appendChild(score)
        document.querySelector('#game').innerHTML += (htmlTable);
        document.querySelector('#game').appendChild(message)
        break;
        
    }
  }


}