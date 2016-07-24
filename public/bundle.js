(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _router = require('./mvc/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.platform = 'browser'; // set to 'browser' or 'console'

var router = new _router2.default();

router.listen();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./mvc/router":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.model = new _model2.default();
    this.model.init();
    this.view = new _view2.default();
    this.view.init(this.model);
  }

  _createClass(Controller, [{
    key: 'up',
    value: function up() {
      this.model.checkThenMove('up');
      this.view.render(this.model);
    }
  }, {
    key: 'right',
    value: function right() {
      this.model.checkThenMove('right');
      this.view.render(this.model);
    }
  }, {
    key: 'down',
    value: function down() {
      this.model.checkThenMove('down');
      this.view.render(this.model);
    }
  }, {
    key: 'left',
    value: function left() {
      this.model.checkThenMove('left');
      this.view.render(this.model);
    }
  }]);

  return Controller;
}();

exports.default = Controller;

},{"./model":3,"./view":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _transpose = require('transpose');

var _transpose2 = _interopRequireDefault(_transpose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.board = [new Array(4), new Array(4), new Array(4), new Array(4)];

    this.board.forEach(function (row) {
      row.fill(0);
    });
    this.score = 0;
    this.gameIsOver = false;
    this.gameStatus = 'Use the arrow keys to move the numbers';
  }

  _createClass(Model, [{
    key: 'init',
    value: function init() {
      this.addRandomNums(2);
    }
  }, {
    key: 'emptyTileExists',
    value: function emptyTileExists() {
      return this.board.some(function (row) {
        return row.includes(0);
      });
    }
  }, {
    key: 'addRandomNums',
    value: function addRandomNums() {
      var amount = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      // 70% chance new number is a 2
      // 30% new number is a 4
      function twoOrFour() {
        if (Math.random() < 0.7) return 2;else return 4;
      }

      function getRandIndex() {
        return Math.floor(Math.random() * 4);
      }

      while (amount > 0) {
        // check there is a space to add a new number
        if (!this.emptyTileExists()) return false;

        var newNum = twoOrFour();
        var hasBeenPlaced = false;

        while (!hasBeenPlaced) {
          var row = getRandIndex();
          var cell = getRandIndex();
          if (this.board[row][cell] == 0) {
            this.board[row][cell] = twoOrFour();
            hasBeenPlaced = true;
          }
        }

        amount--;
      }
    }
  }, {
    key: 'checkThenMove',
    value: function checkThenMove(direction) {
      if (this.gameIsOver) return;

      this[direction]();
    }
  }, {
    key: 'up',
    value: function up() {
      this.board = (0, _transpose2.default)(this.board);
      this.moveLeft();
      this.board = (0, _transpose2.default)(this.board);
    }
  }, {
    key: 'right',
    value: function right() {
      this.board.forEach(function (row) {
        return row.reverse();
      });
      this.moveLeft();
      this.board.forEach(function (row) {
        return row.reverse();
      });
    }
  }, {
    key: 'down',
    value: function down() {
      this.board = (0, _transpose2.default)(this.board);
      this.board.forEach(function (row) {
        return row.reverse();
      });
      this.moveLeft();
      this.board.forEach(function (row) {
        return row.reverse();
      });
      this.board = (0, _transpose2.default)(this.board);
    }
  }, {
    key: 'left',
    value: function left() {
      this.moveLeft();
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {

      function filterZeros(arr) {
        return arr.filter(function (number) {
          return number !== 0;
        });
      }

      this.board = this.board.map(function (row, rowIndex) {
        // create an array with all the numbers together
        // and no zeros
        var shiftedRow = filterZeros(row);

        // row is empty, do nothing
        if (shiftedRow.length === 0) return row;

        shiftedRow.reduce(function (previousNum, currentNum, index, arr) {
          if (previousNum === currentNum) {
            // double first number
            arr[index - 1] = currentNum * 2;
            // remove second number
            arr[index] = 0;
          }
          return arr[index];
        });

        // may contain zeros now
        // lets filter them out
        // so all numbers are on the left
        shiftedRow = filterZeros(shiftedRow);

        if (shiftedRow.length < row.length) {
          // fill the end of the row with zeros
          var startFilling = shiftedRow.length;
          shiftedRow.length = row.length;
          shiftedRow.fill(0, startFilling);
        }

        return shiftedRow;
      });
      this.afterMovement();
    }
  }, {
    key: 'afterMovement',
    value: function afterMovement() {
      this.addRandomNums(1);
      this.updateScore();
    }
  }, {
    key: 'highestNumber',
    value: function highestNumber() {
      return Math.max.apply(null, this.board.map(function (row) {
        return Math.max.apply(null, row);
      }));
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      this.score = this.highestNumber();
      if (this.score >= 2048) {
        this.gameStatus = 'You win! 2048!!! Keep playing if you wish...';
      } else if (!this.canMove()) {
        this.gameIsOver = true;
        this.gameStatus = 'You can\'t make anymore moves, play again? (Press R)';
      }
    }
  }, {
    key: 'canMove',
    value: function canMove() {
      // check there is at least one zero number
      if (this.emptyTileExists()) return true;

      // check if two adjacent numbers are equal
      /* Iterate over ever number, row by row,
         checking if the tile to the right or below
         is of equal value
       */
      return this.board.some(function (row, rowIndex, board) {
        return row.some(function (num, numIndex, numArray) {
          if (rowIndex < board.length - 1) {
            // check number below (+1)
            if (num === board[rowIndex + 1][numIndex]) return true;
          }

          if (numIndex < numArray.length - 1) {
            // check number to right (+1)
            if (num === numArray[numIndex + 1]) return true;
          }
          return false;
        });
      });
    }
  }]);

  return Model;
}();

exports.default = Model;

},{"transpose":31}],4:[function(require,module,exports){
(function (process,global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import keypress from 'keypress'
// import CtrlC from 'ctrl-c'


var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.controller = new _controller2.default();
  }

  _createClass(Router, [{
    key: 'listen',
    value: function listen() {
      var _this = this;

      console.log('here');
      console.log('global', global);
      switch (global.platform) {
        case 'console':
          keypress(process.stdin);
          process.stdin.setRawMode(true);
          process.stdin.resume();
          CtrlC(false); // do not disable ctrl-c

          process.stdin.on('keypress', function (ch, key) {
            if (key && key.code) {
              switch (key.code) {
                case '[A':
                  _this.controller.up();
                  break;
                case '[C':
                  _this.controller.right();
                  break;
                case '[B':
                  _this.controller.down();
                  break;
                case '[D':
                  _this.controller.left();
                  break;
                default:
                // unhandled key, do nothing
              }
            } else if (ch.toLowerCase() === 'r') {
              _this.controller = new _controller2.default();
            }
          });

          break;
        case 'browser':
          // handle document keypress events
          document.addEventListener('keydown', function (e) {
            console.log(e.key);
          });
          break;
      }
    }
  }]);

  return Router;
}();

exports.default = Router;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./controller":2,"_process":30}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View() {
    _classCallCheck(this, View);

    this.table = new _cliTable2.default({});
  }

  _createClass(View, [{
    key: 'init',
    value: function init(model) {
      this.render(model);
    }
  }, {
    key: 'render',
    value: function render(model) {
      var _table;

      switch (global.platform) {
        case 'console':

          // change color of zeros
          var formattedBoard = model.board.map(function (row) {
            return row.map(function (number) {
              if (number === 0) return number.toString().black;else return number.toString();
            });
          });

          this.table = new _cliTable2.default({
            colAligns: new Array(4).fill('middle')
          });
          (_table = this.table).push.apply(_table, _toConsumableArray(formattedBoard));

          (0, _clear2.default)();
          console.log(this.table.toString());

          var line = '-------------------------';

          console.log(model.gameIsOver ? line.red : line);

          var scoreString = model.score >= 2048 ? model.score.toString().bold.green : model.score.toString().yellow;
          console.log('Score:', scoreString);
          console.log('\n', model.gameStatus.bold);
          break;

        case 'browser':
          console.log('view.render(..) in browser');
          break;

      }
    }
  }]);

  return View;
}();

exports.default = View;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"clear":6,"cli-table":7,"colors":23}],6:[function(require,module,exports){
(function (process){
module.exports = function(clear) {
  if (clear !== false) {
    process.stdout.write('\033[2J');
  }
  process.stdout.write('\033[0f');
};

}).call(this,require('_process'))
},{"_process":30}],7:[function(require,module,exports){

/**
 * Module dependencies.
 */

var colors = require('colors/safe')
  , utils = require('./utils')
  , repeat = utils.repeat
  , truncate = utils.truncate
  , pad = utils.pad;

/**
 * Table constructor
 *
 * @param {Object} options
 * @api public
 */

function Table (options){
  this.options = utils.options({
      chars: {
          'top': '─'
        , 'top-mid': '┬'
        , 'top-left': '┌'
        , 'top-right': '┐'
        , 'bottom': '─'
        , 'bottom-mid': '┴'
        , 'bottom-left': '└'
        , 'bottom-right': '┘'
        , 'left': '│'
        , 'left-mid': '├'
        , 'mid': '─'
        , 'mid-mid': '┼'
        , 'right': '│'
        , 'right-mid': '┤'
        , 'middle': '│'
      }
    , truncate: '…'
    , colWidths: []
    , colAligns: []
    , style: {
          'padding-left': 1
        , 'padding-right': 1
        , head: ['red']
        , border: ['grey']
        , compact : false
      }
    , head: []
  }, options);
};

/**
 * Inherit from Array.
 */

Table.prototype.__proto__ = Array.prototype;

/**
 * Width getter
 *
 * @return {Number} width
 * @api public
 */

Table.prototype.__defineGetter__('width', function (){
  var str = this.toString().split("\n");
  if (str.length) return str[0].length;
  return 0;
});

/**
 * Render to a string.
 *
 * @return {String} table representation
 * @api public
 */

Table.prototype.render
Table.prototype.toString = function (){
  var ret = ''
    , options = this.options
    , style = options.style
    , head = options.head
    , chars = options.chars
    , truncater = options.truncate
      , colWidths = options.colWidths || new Array(this.head.length)
      , totalWidth = 0;

    if (!head.length && !this.length) return '';

    if (!colWidths.length){
      var all_rows = this.slice(0);
      if (head.length) { all_rows = all_rows.concat([head]) };

      all_rows.forEach(function(cells){
        // horizontal (arrays)
        if (typeof cells === 'object' && cells.length) {
          extractColumnWidths(cells);

        // vertical (objects)
        } else {
          var header_cell = Object.keys(cells)[0]
            , value_cell = cells[header_cell];

          colWidths[0] = Math.max(colWidths[0] || 0, get_width(header_cell) || 0);

          // cross (objects w/ array values)
          if (typeof value_cell === 'object' && value_cell.length) {
            extractColumnWidths(value_cell, 1);
          } else {
            colWidths[1] = Math.max(colWidths[1] || 0, get_width(value_cell) || 0);
          }
        }
    });
  };

  totalWidth = (colWidths.length == 1 ? colWidths[0] : colWidths.reduce(
    function (a, b){
      return a + b
    })) + colWidths.length + 1;

  function extractColumnWidths(arr, offset) {
    var offset = offset || 0;
    arr.forEach(function(cell, i){
      colWidths[i + offset] = Math.max(colWidths[i + offset] || 0, get_width(cell) || 0);
    });
  };

  function get_width(obj) {
    return typeof obj == 'object' && obj.width != undefined
         ? obj.width
         : ((typeof obj == 'object' ? utils.strlen(obj.text) : utils.strlen(obj)) + (style['padding-left'] || 0) + (style['padding-right'] || 0))
  }

  // draws a line
  function line (line, left, right, intersection){
    var width = 0
      , line =
          left
        + repeat(line, totalWidth - 2)
        + right;

    colWidths.forEach(function (w, i){
      if (i == colWidths.length - 1) return;
      width += w + 1;
      line = line.substr(0, width) + intersection + line.substr(width + 1);
    });

    return applyStyles(options.style.border, line);
  };

  // draws the top line
  function lineTop (){
    var l = line(chars.top
               , chars['top-left'] || chars.top
               , chars['top-right'] ||  chars.top
               , chars['top-mid']);
    if (l)
      ret += l + "\n";
  };

  function generateRow (items, style) {
    var cells = []
      , max_height = 0;

    // prepare vertical and cross table data
    if (!Array.isArray(items) && typeof items === "object") {
      var key = Object.keys(items)[0]
        , value = items[key]
        , first_cell_head = true;

      if (Array.isArray(value)) {
        items = value;
        items.unshift(key);
      } else {
        items = [key, value];
      }
    }

    // transform array of item strings into structure of cells
    items.forEach(function (item, i) {
      var contents = item.toString().split("\n").reduce(function (memo, l) {
        memo.push(string(l, i));
        return memo;
      }, [])

      var height = contents.length;
      if (height > max_height) { max_height = height };

      cells.push({ contents: contents , height: height });
    });

    // transform vertical cells into horizontal lines
    var lines = new Array(max_height);
    cells.forEach(function (cell, i) {
      cell.contents.forEach(function (line, j) {
        if (!lines[j]) { lines[j] = [] };
        if (style || (first_cell_head && i === 0 && options.style.head)) {
          line = applyStyles(options.style.head, line)
        }

        lines[j].push(line);
      });

      // populate empty lines in cell
      for (var j = cell.height, l = max_height; j < l; j++) {
        if (!lines[j]) { lines[j] = [] };
        lines[j].push(string('', i));
      }
    });
    var ret = "";
    lines.forEach(function (line, index) {
      if (ret.length > 0) {
        ret += "\n" + applyStyles(options.style.border, chars.left);
      }

      ret += line.join(applyStyles(options.style.border, chars.middle)) + applyStyles(options.style.border, chars.right);
    });

    return applyStyles(options.style.border, chars.left) + ret;
  };

  function applyStyles(styles, subject) {
    if (!subject)
      return '';
    styles.forEach(function(style) {
      subject = colors[style](subject);
    });
    return subject;
  };

  // renders a string, by padding it or truncating it
  function string (str, index){
    var str = String(typeof str == 'object' && str.text ? str.text : str)
      , length = utils.strlen(str)
      , width = colWidths[index]
          - (style['padding-left'] || 0)
          - (style['padding-right'] || 0)
      , align = options.colAligns[index] || 'left';

    return repeat(' ', style['padding-left'] || 0)
         + (length == width ? str :
             (length < width
              ? pad(str, ( width + (str.length - length) ), ' ', align == 'left' ? 'right' :
                  (align == 'middle' ? 'both' : 'left'))
              : (truncater ? truncate(str, width, truncater) : str))
           )
         + repeat(' ', style['padding-right'] || 0);
  };

  if (head.length){
    lineTop();

    ret += generateRow(head, style.head) + "\n"
  }

  if (this.length)
    this.forEach(function (cells, i){
      if (!head.length && i == 0)
        lineTop();
      else {
        if (!style.compact || i<(!!head.length) ?1:0 || cells.length == 0){
          var l = line(chars.mid
                     , chars['left-mid']
                     , chars['right-mid']
                     , chars['mid-mid']);
          if (l)
            ret += l + "\n"
        }
      }

      if (cells.hasOwnProperty("length") && !cells.length) {
        return
      } else {
        ret += generateRow(cells) + "\n";
      };
    });

  var l = line(chars.bottom
             , chars['bottom-left'] || chars.bottom
             , chars['bottom-right'] || chars.bottom
             , chars['bottom-mid']);
  if (l)
    ret += l;
  else
    // trim the last '\n' if we didn't add the bottom decoration
    ret = ret.slice(0, -1);

  return ret;
};

/**
 * Module exports.
 */

module.exports = Table;

module.exports.version = '0.0.1';

},{"./utils":8,"colors/safe":18}],8:[function(require,module,exports){

/**
 * Repeats a string.
 *
 * @param {String} char(s)
 * @param {Number} number of times
 * @return {String} repeated string
 */

exports.repeat = function (str, times){
  return Array(times + 1).join(str);
};

/**
 * Pads a string
 *
 * @api public
 */

exports.pad = function (str, len, pad, dir) {
  if (len + 1 >= str.length)
    switch (dir){
      case 'left':
        str = Array(len + 1 - str.length).join(pad) + str;
        break;

      case 'both':
        var right = Math.ceil((padlen = len - str.length) / 2);
        var left = padlen - right;
        str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
        break;

      default:
        str = str + Array(len + 1 - str.length).join(pad);
    };

  return str;
};

/**
 * Truncates a string
 *
 * @api public
 */

exports.truncate = function (str, length, chr){
  chr = chr || '…';
  return str.length >= length ? str.substr(0, length - chr.length) + chr : str;
};

/**
 * Copies and merges options with defaults.
 *
 * @param {Object} defaults
 * @param {Object} supplied options
 * @return {Object} new (merged) object
 */

function options(defaults, opts) {
  for (var p in opts) {
    if (opts[p] && opts[p].constructor && opts[p].constructor === Object) {
      defaults[p] = defaults[p] || {};
      options(defaults[p], opts[p]);
    } else {
      defaults[p] = opts[p];
    }
  }
  return defaults;
};
exports.options = options;

//
// For consideration of terminal "color" programs like colors.js,
// which can add ANSI escape color codes to strings,
// we destyle the ANSI color escape codes for padding calculations.
//
// see: http://en.wikipedia.org/wiki/ANSI_escape_code
//
exports.strlen = function(str){
  var code = /\u001b\[(?:\d*;){0,5}\d*m/g;
  var stripped = ("" + str).replace(code,'');
  var split = stripped.split("\n");
  return split.reduce(function (memo, s) { return (s.length > memo) ? s.length : memo }, 0);
}

},{}],9:[function(require,module,exports){
/*

The MIT License (MIT)

Original Library 
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};

var ansiStyles = colors.styles = require('./styles');
var defineProps = Object.defineProperties;

colors.supportsColor = require('./system/supports-colors');

if (typeof colors.enabled === "undefined") {
  colors.enabled = colors.supportsColor;
}

colors.stripColors = colors.strip = function(str){
  return ("" + str).replace(/\x1B\[\d+m/g, '');
};


var stylize = colors.stylize = function stylize (str, style) {
  return ansiStyles[style].open + str + ansiStyles[style].close;
}

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe,  '\\$&');
}

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = (function () {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function (key) {
    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function () {
        return build(this._styles.concat(key));
      }
    };
  });
  return ret;
})();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = arguments;
  var argsLen = args.length;
  var str = argsLen !== 0 && String(arguments[0]);
  if (argsLen > 1) {
    for (var a = 1; a < argsLen; a++) {
      str += ' ' + args[a];
    }
  }

  if (!colors.enabled || !str) {
    return str;
  }

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
  }

  return str;
}

function applyTheme (theme) {
  for (var style in theme) {
    (function(style){
      colors[style] = function(str){
        return colors[theme[style]](str);
      };
    })(style)
  }
}

colors.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      colors.themes[theme] = require(theme);
      applyTheme(colors.themes[theme]);
      return colors.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build([name]);
      }
    };
  });
  return ret;
}

var sequencer = function sequencer (map, str) {
  var exploded = str.split(""), i = 0;
  exploded = exploded.map(map);
  return exploded.join("");
};

// custom formatter methods
colors.trap = require('./custom/trap');
colors.zalgo = require('./custom/zalgo');

// maps
colors.maps = {};
colors.maps.america = require('./maps/america');
colors.maps.zebra = require('./maps/zebra');
colors.maps.rainbow = require('./maps/rainbow');
colors.maps.random = require('./maps/random')

for (var map in colors.maps) {
  (function(map){
    colors[map] = function (str) {
      return sequencer(colors.maps[map], str);
    }
  })(map)
}

defineProps(colors, init());
},{"./custom/trap":10,"./custom/zalgo":11,"./maps/america":12,"./maps/rainbow":13,"./maps/random":14,"./maps/zebra":15,"./styles":16,"./system/supports-colors":17}],10:[function(require,module,exports){
module['exports'] = function runTheTrap (text, options) {
  var result = "";
  text = text || "Run the trap, drop the bass";
  text = text.split('');
  var trap = {
    a: ["\u0040", "\u0104", "\u023a", "\u0245", "\u0394", "\u039b", "\u0414"],
    b: ["\u00df", "\u0181", "\u0243", "\u026e", "\u03b2", "\u0e3f"],
    c: ["\u00a9", "\u023b", "\u03fe"],
    d: ["\u00d0", "\u018a", "\u0500" , "\u0501" ,"\u0502", "\u0503"],
    e: ["\u00cb", "\u0115", "\u018e", "\u0258", "\u03a3", "\u03be", "\u04bc", "\u0a6c"],
    f: ["\u04fa"],
    g: ["\u0262"],
    h: ["\u0126", "\u0195", "\u04a2", "\u04ba", "\u04c7", "\u050a"],
    i: ["\u0f0f"],
    j: ["\u0134"],
    k: ["\u0138", "\u04a0", "\u04c3", "\u051e"],
    l: ["\u0139"],
    m: ["\u028d", "\u04cd", "\u04ce", "\u0520", "\u0521", "\u0d69"],
    n: ["\u00d1", "\u014b", "\u019d", "\u0376", "\u03a0", "\u048a"],
    o: ["\u00d8", "\u00f5", "\u00f8", "\u01fe", "\u0298", "\u047a", "\u05dd", "\u06dd", "\u0e4f"],
    p: ["\u01f7", "\u048e"],
    q: ["\u09cd"],
    r: ["\u00ae", "\u01a6", "\u0210", "\u024c", "\u0280", "\u042f"],
    s: ["\u00a7", "\u03de", "\u03df", "\u03e8"],
    t: ["\u0141", "\u0166", "\u0373"],
    u: ["\u01b1", "\u054d"],
    v: ["\u05d8"],
    w: ["\u0428", "\u0460", "\u047c", "\u0d70"],
    x: ["\u04b2", "\u04fe", "\u04fc", "\u04fd"],
    y: ["\u00a5", "\u04b0", "\u04cb"],
    z: ["\u01b5", "\u0240"]
  }
  text.forEach(function(c){
    c = c.toLowerCase();
    var chars = trap[c] || [" "];
    var rand = Math.floor(Math.random() * chars.length);
    if (typeof trap[c] !== "undefined") {
      result += trap[c][rand];
    } else {
      result += c;
    }
  });
  return result;

}

},{}],11:[function(require,module,exports){
// please no
module['exports'] = function zalgo(text, options) {
  text = text || "   he is here   ";
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }
  

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] = options["up"] || true;
    options["mid"] = options["mid"] || true;
    options["down"] = options["down"] || true;
    options["size"] = options["size"] || "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.min = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.min = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text);
}

},{}],12:[function(require,module,exports){
var colors = require('../colors');

module['exports'] = (function() {
  return function (letter, i, exploded) {
    if(letter === " ") return letter;
    switch(i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter)
      case 2: return colors.blue(letter)
    }
  }
})();
},{"../colors":9}],13:[function(require,module,exports){
var colors = require('../colors');

module['exports'] = (function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
})();


},{"../colors":9}],14:[function(require,module,exports){
var colors = require('../colors');

module['exports'] = (function () {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];
  return function(letter, i, exploded) {
    return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
  };
})();
},{"../colors":9}],15:[function(require,module,exports){
var colors = require('../colors');

module['exports'] = function (letter, i, exploded) {
  return i % 2 === 0 ? letter : colors.inverse(letter);
};
},{"../colors":9}],16:[function(require,module,exports){
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var styles = {};
module['exports'] = styles;

var codes = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49]

};

Object.keys(codes).forEach(function (key) {
  var val = codes[key];
  var style = styles[key] = [];
  style.open = '\u001b[' + val[0] + 'm';
  style.close = '\u001b[' + val[1] + 'm';
});
},{}],17:[function(require,module,exports){
(function (process){
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var argv = process.argv;

module.exports = (function () {
  if (argv.indexOf('--no-color') !== -1 ||
    argv.indexOf('--color=false') !== -1) {
    return false;
  }

  if (argv.indexOf('--color') !== -1 ||
    argv.indexOf('--color=true') !== -1 ||
    argv.indexOf('--color=always') !== -1) {
    return true;
  }

  if (process.stdout && !process.stdout.isTTY) {
    return false;
  }

  if (process.platform === 'win32') {
    return true;
  }

  if ('COLORTERM' in process.env) {
    return true;
  }

  if (process.env.TERM === 'dumb') {
    return false;
  }

  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    return true;
  }

  return false;
})();
}).call(this,require('_process'))
},{"_process":30}],18:[function(require,module,exports){
//
// Remark: Requiring this file will use the "safe" colors API which will not touch String.prototype
//
//   var colors = require('colors/safe);
//   colors.red("foo")
//
//
var colors = require('./lib/colors');
module['exports'] = colors;
},{"./lib/colors":9}],19:[function(require,module,exports){
/*

The MIT License (MIT)

Original Library 
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};

var ansiStyles = colors.styles = require('./styles');
var defineProps = Object.defineProperties;

colors.supportsColor = require('./system/supports-colors');

if (typeof colors.enabled === "undefined") {
  colors.enabled = colors.supportsColor;
}

colors.stripColors = colors.strip = function(str){
  return ("" + str).replace(/\x1B\[\d+m/g, '');
};


var stylize = colors.stylize = function stylize (str, style) {
  if (!colors.enabled) {
    return str+'';
  }

  return ansiStyles[style].open + str + ansiStyles[style].close;
}

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe,  '\\$&');
}

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = (function () {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function (key) {
    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function () {
        return build(this._styles.concat(key));
      }
    };
  });
  return ret;
})();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = arguments;
  var argsLen = args.length;
  var str = argsLen !== 0 && String(arguments[0]);
  if (argsLen > 1) {
    for (var a = 1; a < argsLen; a++) {
      str += ' ' + args[a];
    }
  }

  if (!colors.enabled || !str) {
    return str;
  }

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
  }

  return str;
}

function applyTheme (theme) {
  for (var style in theme) {
    (function(style){
      colors[style] = function(str){
        if (typeof theme[style] === 'object'){
          var out = str;
          for (var i in theme[style]){
            out = colors[theme[style][i]](out);
          }
          return out;
        }
        return colors[theme[style]](str);
      };
    })(style)
  }
}

colors.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      colors.themes[theme] = require(theme);
      applyTheme(colors.themes[theme]);
      return colors.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build([name]);
      }
    };
  });
  return ret;
}

var sequencer = function sequencer (map, str) {
  var exploded = str.split(""), i = 0;
  exploded = exploded.map(map);
  return exploded.join("");
};

// custom formatter methods
colors.trap = require('./custom/trap');
colors.zalgo = require('./custom/zalgo');

// maps
colors.maps = {};
colors.maps.america = require('./maps/america');
colors.maps.zebra = require('./maps/zebra');
colors.maps.rainbow = require('./maps/rainbow');
colors.maps.random = require('./maps/random')

for (var map in colors.maps) {
  (function(map){
    colors[map] = function (str) {
      return sequencer(colors.maps[map], str);
    }
  })(map)
}

defineProps(colors, init());
},{"./custom/trap":20,"./custom/zalgo":21,"./maps/america":24,"./maps/rainbow":25,"./maps/random":26,"./maps/zebra":27,"./styles":28,"./system/supports-colors":29}],20:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],21:[function(require,module,exports){
// please no
module['exports'] = function zalgo(text, options) {
  text = text || "   he is here   ";
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }
  

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] =   typeof options["up"]   !== 'undefined' ? options["up"]   : true;
    options["mid"] =  typeof options["mid"]  !== 'undefined' ? options["mid"]  : true;
    options["down"] = typeof options["down"] !== 'undefined' ? options["down"] : true;
    options["size"] = typeof options["size"] !== 'undefined' ? options["size"] : "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.mid = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.mid = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text, options);
}

},{}],22:[function(require,module,exports){
var colors = require('./colors');

module['exports'] = function () {

  //
  // Extends prototype of native string object to allow for "foo".red syntax
  //
  var addProperty = function (color, func) {
    String.prototype.__defineGetter__(color, func);
  };

  var sequencer = function sequencer (map, str) {
      return function () {
        var exploded = this.split(""), i = 0;
        exploded = exploded.map(map);
        return exploded.join("");
      }
  };

  addProperty('strip', function () {
    return colors.strip(this);
  });

  addProperty('stripColors', function () {
    return colors.strip(this);
  });

  addProperty("trap", function(){
    return colors.trap(this);
  });

  addProperty("zalgo", function(){
    return colors.zalgo(this);
  });

  addProperty("zebra", function(){
    return colors.zebra(this);
  });

  addProperty("rainbow", function(){
    return colors.rainbow(this);
  });

  addProperty("random", function(){
    return colors.random(this);
  });

  addProperty("america", function(){
    return colors.america(this);
  });

  //
  // Iterate through all default styles and colors
  //
  var x = Object.keys(colors.styles);
  x.forEach(function (style) {
    addProperty(style, function () {
      return colors.stylize(this, style);
    });
  });

  function applyTheme(theme) {
    //
    // Remark: This is a list of methods that exist
    // on String that you should not overwrite.
    //
    var stringPrototypeBlacklist = [
      '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
      'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
      'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
      'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
    ];

    Object.keys(theme).forEach(function (prop) {
      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
        console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
      }
      else {
        if (typeof(theme[prop]) === 'string') {
          colors[prop] = colors[theme[prop]];
          addProperty(prop, function () {
            return colors[theme[prop]](this);
          });
        }
        else {
          addProperty(prop, function () {
            var ret = this;
            for (var t = 0; t < theme[prop].length; t++) {
              ret = colors[theme[prop][t]](ret);
            }
            return ret;
          });
        }
      }
    });
  }

  colors.setTheme = function (theme) {
    if (typeof theme === 'string') {
      try {
        colors.themes[theme] = require(theme);
        applyTheme(colors.themes[theme]);
        return colors.themes[theme];
      } catch (err) {
        console.log(err);
        return err;
      }
    } else {
      applyTheme(theme);
    }
  };

};
},{"./colors":19}],23:[function(require,module,exports){
var colors = require('./colors');
module['exports'] = colors;

// Remark: By default, colors will add style properties to String.prototype
//
// If you don't wish to extend String.prototype you can do this instead and native String will not be touched
//
//   var colors = require('colors/safe);
//   colors.red("foo")
//
//
require('./extendStringPrototype')();
},{"./colors":19,"./extendStringPrototype":22}],24:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"../colors":19,"dup":12}],25:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"../colors":19,"dup":13}],26:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"../colors":19,"dup":14}],27:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"../colors":19,"dup":15}],28:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16}],29:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"_process":30,"dup":17}],30:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],31:[function(require,module,exports){
function transpose(m) {
  var mt;

  var rows;
  var cols;

  var i, j;

  mt = [];

  rows = m.length;
  cols = m[0].length;

  for (j = 0; j < cols; j++) {
    for (i = 0; i < rows; i++) {
      if (!mt[j]) {
        mt[j] = [];
      }

      mt[j][i] = m[i][j];
    }
  }

  return mt;
}

module.exports = transpose;
},{}]},{},[1]);
