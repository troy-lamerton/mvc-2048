import Model from './model'
import View from './view'

export default class Controller {
  constructor () {
    this.model = new Model()
    this.model.init()
    this.view = new View()
    this.view.init(this.model)
  }

  up () {
    this.model.checkThenMove('up');
    this.view.render(this.model)
  }

  right () {
    this.model.checkThenMove('right');
    this.view.render(this.model)
  }

  down () {
    this.model.checkThenMove('down');
    this.view.render(this.model)
  }

  left () {
    this.model.checkThenMove('left');
    this.view.render(this.model)
  }

}