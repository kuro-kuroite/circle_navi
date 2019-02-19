"use strict";

require("@babel/polyfill");

var _prelude = require("@kuro-kuroite/prelude");

var _index = require("./index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var optionDefinitions = [{
  name: 'message',
  alias: 'M',
  defaultValue: 'こんにちは',
  type: String,
  description: 'Google Home が発話する内容'
}, {
  name: 'help',
  alias: 'h',
  type: Boolean,
  description: 'show help'
}];
var sections = [{
  header: 'circle navi notifier',
  content: 'Google Homeが，コマンドライン引数 message を発話する'
}, {
  header: 'Options',
  optionList: optionDefinitions
}];
var options = (0, _prelude.configCommandLineArgs)(optionDefinitions, sections, process.argv);

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _index.speak)(options.message);

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          // eslint-disable-next-line no-console
          console.log(_context.t0);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 5]]);
}))();