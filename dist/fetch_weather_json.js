"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _prelude = require("@kuro-kuroite/prelude");

var _miniOpenweathermap = require("@kuro-kuroite/mini-openweathermap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _prelude.configEnv)();
var _process$env = process.env,
    OPEN_WEATHER_MAP_KEY = _process$env.OPEN_WEATHER_MAP_KEY,
    OPEN_WEATHER_MAP_CITY = _process$env.OPEN_WEATHER_MAP_CITY,
    LANGUAGE = _process$env.LANGUAGE;

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var fileName,
        openWeatherMapProxy,
        openWeather,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fileName = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : _path.default.resolve(__dirname, '../', 'weathers.json');
            openWeatherMapProxy = new _miniOpenweathermap.OpenWeatherMapProxy(OPEN_WEATHER_MAP_KEY, {
              city: OPEN_WEATHER_MAP_CITY,
              lang: LANGUAGE
            });
            _context2.next = 4;
            return openWeatherMapProxy.fetchCurrentWeather();

          case 4:
            openWeather = _context2.sent;
            _context2.next = 7;
            return _prelude.fsAsync.writeFile(fileName, JSON.stringify(openWeather, null, '  '));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _main.apply(this, arguments);
}

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return main();

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