import Controller from './controller'
/* Comment out the two imports below to play in browser */

export default class Router {
  constructor () {
    this.controller = new Controller();
  }

  listen () {
    // handle document keypress events
    document.addEventListener('keydown', (e) => {

      switch (e.key) {
        case 'ArrowUp':
          this.controller.up();
          break;
        case 'ArrowRight':
          this.controller.right();
          break;
        case 'ArrowDown':
          this.controller.down();
          break;
        case 'ArrowLeft':
          this.controller.left();
          break;
        case 'r':
        case 'R':
          this.controller = new Controller();
        default:
          // unhandled key, do nothing
        }

    })
  }
}