"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _prelude = require("@kuro-kuroite/prelude");

var _miniPromisifyGooglecalendar = require("@kuro-kuroite/mini-promisify-googlecalendar");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _prelude.configEnv)();

var tokenPath = _path.default.resolve(__dirname, '../', process.env.TOKEN_PATH);

var clientSecretPath = _path.default.resolve(__dirname, '../', process.env.CLIENT_SECRET_PATH);

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var fileName,
        auth,
        events,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fileName = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : _path.default.resolve(__dirname, '../', 'events.json');
            _context2.next = 3;
            return (0, _miniPromisifyGooglecalendar.withAuthorize)(tokenPath, clientSecretPath);

          case 3:
            auth = _context2.sent;
            _context2.next = 6;
            return (0, _index.listEvents)(auth, new Date().toISOString());

          case 6:
            events = _context2.sent;
            _context2.next = 9;
            return _prelude.fsAsync.writeFile(fileName, JSON.stringify(events, null, '  '));

          case 9:
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