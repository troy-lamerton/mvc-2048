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
        this.table = new Table({});
        this.table.push(...model.board);
        clear();
        console.log(this.table.toString());
        console.log('-----------------');
        console.log('Score:', model.score.toString().yellow);
        console.log(model.gameOverMessage.bold);
        break;

      case 'browser':
        console.log('view.render(..) in browser')
        break;
    }
  }


}