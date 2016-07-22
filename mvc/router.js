import Controller from './controller'
import keypress from 'keypress'
import CtrlC from 'ctrl-c'


export default class Router {
  constructor () {
    // is there a global place I can store this instead? e.g. process / env variable
    // otherwise will have to pass platform to controller, and then to view
    console.log(Controller)
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
          }
        })

        break;
      case 'browser':
        // handle document keypress events
        break;
    }
  }
}