(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routerBrowser = require('./mvc/router-browser');

var _routerBrowser2 = _interopRequireDefault(_routerBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _routerBrowser2.default();

router.listen();

},{"./mvc/router-browser":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _viewBrowser = require('./view-browser');

var _viewBrowser2 = _interopRequireDefault(_viewBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.model = new _model2.default();
    this.model.init();
    this.view = new _viewBrowser2.default();
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

},{"./model":3,"./view-browser":5}],3:[function(require,module,exports){
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

},{"transpose":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Comment out the two imports below to play in browser */

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.controller = new _controller2.default();
  }

  _createClass(Router, [{
    key: 'listen',
    value: function listen() {
      var _this = this;

      // handle document keypress events
      document.addEventListener('keydown', function (e) {

        switch (e.key) {
          case 'ArrowUp':
            _this.controller.up();
            break;
          case 'ArrowRight':
            _this.controller.right();
            break;
          case 'ArrowDown':
            _this.controller.down();
            break;
          case 'ArrowLeft':
            _this.controller.left();
            break;
          case 'r':
          case 'R':
            _this.controller = new _controller2.default();
          default:
          // unhandled key, do nothing
        }
      });
    }
  }]);

  return Router;
}();

exports.default = Router;

},{"./controller":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tableify = require('tableify');

var _tableify2 = _interopRequireDefault(_tableify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: 'init',
    value: function init(model) {
      this.render(model);
    }
  }, {
    key: 'render',
    value: function render(model) {

      var replacedZerosBoard = model.board.map(function (row) {
        return row.map(function (num) {
          if (num === 0) return '';else return num;
        });
      });
      var htmlTable = (0, _tableify2.default)(replacedZerosBoard);

      var score = document.createElement('p');
      score.className = 'score';
      score.innerHTML = 'Score: ' + model.score.toString();

      var message = document.createElement('p');
      message.innerHTML = model.gameStatus;

      document.querySelector('#game').innerHTML = '';

      document.querySelector('#game').appendChild(score);
      document.querySelector('#game').innerHTML += htmlTable;
      document.querySelector('#game').appendChild(message);
    }
  }]);

  return View;
}();

exports.default = View;

},{"tableify":6}],6:[function(require,module,exports){
"use strict";

module.exports = tableify;

function tableify(obj, columns, parents) {
    var buf = [];
    var type = typeof obj;
    var cols;

    parents = parents || [];

    if (type !== 'object' || obj == null || obj == undefined) {
    }
    else if (~parents.indexOf(obj)) {
        return "[Circular]";
    }
    else {
        parents.push(obj);
    }

    if (Array.isArray(obj)) {
        if (obj.every(Array.isArray)) {
            buf.push('<table>','<tbody>');
            cols = [];
            
            // 2D array is an array of rows
            obj.forEach(function (row, ix) {
                cols.push(ix);

                buf.push('<tr>');

                row.forEach(function (val) {
                    buf.push('<td' + getClass(val) + '>', tableify(val, cols, parents), '</td>')
                })
                
                buf.push('</tr>');
            });
            
            buf.push('</tbody>','</table>');
        }
        else if (typeof obj[0] === 'object') {
            buf.push('<table>','<thead>','<tr>');

            //loop through every object and get unique keys
            var keys = {};
            obj.forEach(function (o) {
                if (typeof o === 'object' && !Array.isArray(o)) {
                    Object.keys(o).forEach(function (k) {
                        keys[k] = true;
                    });
                }
            });

            cols = Object.keys(keys);

            cols.forEach(function (key) {
                buf.push('<th' + getClass(obj[0][key]) + '>', key, '</th>');
            });

            buf.push('</tr>', '</thead>', '<tbody>');

            obj.forEach(function (record) {
                buf.push('<tr>');
                buf.push(tableify(record, cols, parents));
                buf.push('</tr>');
            });

            buf.push('</tbody></table>');
        }
        else {
            buf.push('<table>','<tbody>');
            cols = [];
            
            obj.forEach(function (val, ix) {
                cols.push(ix);
                buf.push('<tr>', '<td' + getClass(val) + '>', tableify(val, cols, parents), '</td>', '</tr>');
            });
            
            buf.push('</tbody>','</table>');
        }
        
    }
    else if (obj && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date)) {
        if (!columns) {
            buf.push('<table>');

            Object.keys(obj).forEach(function (key) {
                buf.push('<tr>', '<th' + getClass(obj[key]) + '>', key, '</th>', '<td' + getClass(obj[key]) + '>', tableify(obj[key], false, parents), '</td>', '</tr>');
            });

            buf.push('</table>');
        }
        else {
            columns.forEach(function (key) {
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], false, parents), '</td>');
                }
                else {
                    buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], columns, parents), '</td>');
                }
            });
        }
    }
    else {
        buf.push(obj);
    }

    if (type !== 'object' || obj == null || obj == undefined) {
    }
    else {
        parents.pop(obj);
    }

    return buf.join('');
}

function getClass(obj) {
    return ' class="' 
        + ((obj && obj.constructor)
            ? obj.constructor.name 
            : typeof obj
        ).toLowerCase()
        + ((obj === null)
            ? ' null'
            : ''
        )
        + '"'
        ;
}

},{}],7:[function(require,module,exports){
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
