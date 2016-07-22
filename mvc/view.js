import Table from 'cli-table'
import clear from 'clear'

export default class View {
  constructor () {
    this.table = new Table({});
  }

  render (model) {
    this.table = new Table({});
    this.table.push(...model.board);
    clear();
    console.log(this.table.toString());
    console.log('-----------------')
    console.log('Score:', model.score)
  }


}