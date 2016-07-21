import Table from 'cli-table'
import clear from 'clear'

export default class View {
  constructor () {
    this.table = new Table({});
  }

  init (model) {
    //display view for the first time
    console.log('initialise view');
    this.render(model);
  }

  render (model) {
    clear();
    this.table.push(...model.board);
    console.log(this.table.toString());
  }


}