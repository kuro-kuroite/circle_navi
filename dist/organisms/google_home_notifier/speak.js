"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = speak;

var _miniGoogleHomeNotifier = require("@kuro-kuroite/mini-google-home-notifier");

var _prelude = require("@kuro-kuroite/prelude");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _prelude.configEnv)();
var _process$env = process.env,
    GOOGLE_HOME_NAME_OR_IP = _process$env.GOOGLE_HOME_NAME_OR_IP,
    LANGUAGE = _process$env.LANGUAGE;

function speak(_x) {
  return _speak.apply(this, arguments);
}

function _speak() {
  _speak = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(message) {
    var myHome;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myHome = new _miniGoogleHomeNotifier.GoogleHomeNotifier(GOOGLE_HOME_NAME_OR_IP, {
              language: LANGUAGE
            });
            _context.next = 3;
            return myHome.speak(message);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _speak.apply(this, arguments);
}