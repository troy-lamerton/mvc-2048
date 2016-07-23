import Table from 'cli-table'
import clear from 'clear'
import colors from 'colors'

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
        // change colors of numbers
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
        console.log('Score:', model.score.toString().yellow);
        console.log('\n', model.gameStatus.bold);
        break;

      case 'browser':
        console.log('view.render(..) in browser')
        break;
    }
  }


}