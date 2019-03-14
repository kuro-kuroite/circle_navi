"use strict";

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _prelude = require("@kuro-kuroite/prelude");

var _generate_speak_string = _interopRequireDefault(require("./generate_speak_string"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var optionDefinitions = [{
  name: 'events',
  alias: 'E',
  defaultValue: 'events.json',
  type: String,
  description: 'absolute json file path about events'
}, {
  name: 'weathers',
  alias: 'W',
  type: String,
  defaultValue: 'weathers.json',
  description: 'absolute json file path about weathers'
}, {
  name: 'help',
  alias: 'h',
  type: Boolean,
  description: 'show help'
}];
var sections = [{
  header: 'circle navi',
  content: 'this is collect weather and event data and generate content'
}, {
  header: 'Options',
  optionList: optionDefinitions
}];
var options = (0, _prelude.configCommandLineArgs)(optionDefinitions, sections, process.argv);

var eventsPath = _path.default.resolve(__dirname, '../', options.events);

var weathersPath = _path.default.resolve(__dirname, '../', options.weathers);

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.t0 = _index.speak;
          _context.next = 4;
          return (0, _generate_speak_string.default)(eventsPath, weathersPath);

        case 4:
          _context.t1 = _context.sent;
          _context.next = 7;
          return (0, _context.t0)(_context.t1);

        case 7:
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t2 = _context["catch"](0);
          // eslint-disable-next-line no-console
          console.log(_context.t2);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 9]]);
}))();