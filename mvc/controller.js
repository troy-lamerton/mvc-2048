import Model from './model'
import View from './view'

export default class Controller {
  constructor () {
    this.model = new Model()
    this.view = new View()
    this.view.init(this.model)
  }

  up () {
    this.model.up();
    this.view.render(this.model)
  }

  right () {
    this.model.right();
    this.view.render(this.model)
  }

  down () {
    this.model.down();
    this.view.render(this.model)
  }

  left () {
    this.model.left();
    this.view.render(this.model)
  }

}