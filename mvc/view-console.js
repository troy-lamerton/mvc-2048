import Table from 'cli-table'
import clear from 'clear'
import colors from 'colors'

export default class View {
  constructor () {

  }

  init (model) {
    this.render(model)
  }
  render (model) {

    // change color of zeros
    const formattedBoard = model.board.map((row) => {
      return row.map((number) => {
        if (number === 0) return number.toString().black 
        else return number.toString();
      })
    })

    const table = new Table({
      colAligns: new Array(4).fill('middle'),
    });

    table.push(...formattedBoard);

    clear();
    console.log(table.toString());
    
    const line = '-------------------------';
    
    console.log((model.gameIsOver)?line.red:line);

    const scoreString = (model.score >= 2048) ? 
      model.score.toString().bold.green :
      model.score.toString().yellow
    console.log('Score:', scoreString);
    console.log('\n', model.gameStatus.bold);
    
  }


}