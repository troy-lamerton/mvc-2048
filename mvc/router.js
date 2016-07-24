import Controller from './controller'
/* Comment out the two imports below to play in browser */
// import keypress from 'keypress'
// import CtrlC from 'ctrl-c'


export default class Router {
  constructor () {
    this.controller = new Controller();
  }

  listen () {
    switch (global.platform) {
      case 'console':
        keypress(process.stdin);
        process.stdin.setRawMode( true );
        process.stdin.resume();
        CtrlC(false); // do not disable ctrl-c

        process.stdin.on('keypress', (ch, key) => {
          if (key && key.code) {
            switch (key.code) {
              case '[A':
                this.controller.up();
                break;
              case '[C':
                this.controller.right();
                break;
              case '[B':
                this.controller.down();
                break;
              case '[D':
                this.controller.left();
                break;
              default:
                // unhandled key, do nothing
            }
          } else if (ch.toLowerCase() === 'r') {
            this.controller = new Controller();
          }
        })

        break;
      case 'browser':
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
        break;
    }
  }
}