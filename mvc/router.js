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
    console.log('listening in router')
    switch (global.platform) {
      case 'console':
        process.stdin.setRawMode( true );
        process.stdin.resume();
        CtrlC(false); // do not disable ctrl-c
        keypress(process.stdin);

        console.log('Welcome to the console view of 2048 game')
        process.stdin.on('keypress', (ch, key) => {
          console.log('-----------------')
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
          console.log('-----------------')
        })

        break;
      case 'browser':
        // handle document keypress events
        break;
    }
  }
}