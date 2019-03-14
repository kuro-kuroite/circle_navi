"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = speak;

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _prelude = require("@kuro-kuroite/prelude");

var _miniGoogleHomeNotifier = require("@kuro-kuroite/mini-google-home-notifier");

var _generate_speak_string = _interopRequireDefault(require("./generate_speak_string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _prelude.configEnv)();
var _process$env = process.env,
    GOOGLE_HOME_NAME = _process$env.GOOGLE_HOME_NAME,
    LANGUAGE = _process$env.LANGUAGE;
var optionDefinitions = [{
  name: 'events',
  alias: 'E',
  type: String,
  defaultValue: 'events.json',
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
  content: 'this is collect weather and event data and generate content to speak'
}, {
  header: 'Options',
  optionList: optionDefinitions
}];
var options = (0, _prelude.configCommandLineArgs)(optionDefinitions, sections, process.argv);

var eventsPath = _path.default.resolve(__dirname, '../', options.events);

var weathersPath = _path.default.resolve(__dirname, '../', options.weathers);

function speak(_x) {
  return _speak.apply(this, arguments);
}

function _speak() {
  _speak = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(message) {
    var myHome;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            myHome = new _miniGoogleHomeNotifier.GoogleHomeNotifier(GOOGLE_HOME_NAME, {
              language: LANGUAGE
            });
            _context2.next = 3;
            return myHome.speak(message);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _speak.apply(this, arguments);
}

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.t0 = console;
          _context.next = 4;
          return (0, _generate_speak_string.default)(eventsPath, weathersPath);

        case 4:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, _context.t1);

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t2 = _context["catch"](0);
          // eslint-disable-next-line no-console
          console.log(_context.t2);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 8]]);
}))();