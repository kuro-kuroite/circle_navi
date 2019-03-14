"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateSpeakString;

require("@babel/polyfill");

var _prelude = require("@kuro-kuroite/prelude");

var _miniGooglecalendarEvent = require("@kuro-kuroite/mini-googlecalendar-event");

var _miniOpenweathermap = require("@kuro-kuroite/mini-openweathermap");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _prelude.configEnv)();
var REGION = process.env.REGION;

function generateSpeakString(_x, _x2) {
  return _generateSpeakString.apply(this, arguments);
}

function _generateSpeakString() {
  _generateSpeakString = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(eventFile, openWeatherFile) {
    var message, events, eventList, openWeather, forecastList, currentForecast, eventsContent, todayForecasts, changeForecasts, hasRain;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = new _prelude.StringBuffer();
            _context.t0 = JSON;
            _context.next = 4;
            return _prelude.fsAsync.readFile(eventFile, 'utf8');

          case 4:
            _context.t1 = _context.sent;
            events = _context.t0.parse.call(_context.t0, _context.t1);
            eventList = new _miniGooglecalendarEvent.CalendarEventList(events, {
              region: REGION
            });
            _context.t2 = JSON;
            _context.next = 10;
            return _prelude.fsAsync.readFile(openWeatherFile, 'utf8');

          case 10:
            _context.t3 = _context.sent;
            openWeather = _context.t2.parse.call(_context.t2, _context.t3);
            forecastList = new _miniOpenweathermap.OpenWeatherMapForecastList(openWeather);
            currentForecast = forecastList.currentForecast;
            eventsContent = eventList.concatEvents(events, function (name, place, startTimesOfDay) {
              var startTimeOfDayPhrase = startTimesOfDay ? "".concat(startTimesOfDay, "\u304B\u3089\uFF0C") : '';
              var placePhrase = place !== '' ? "".concat(place, "\u3067") : '';
              return "".concat(startTimeOfDayPhrase).concat(placePhrase).concat(name, "\n");
            });
            message.concatString(eventsContent);
            todayForecasts = forecastList.filterForecastsByDateTime(forecastList.toDate(currentForecast.dt_txt));
            changeForecasts = forecastList.changeForecasts(todayForecasts);
            message.concatString("\u305F\u3060\u4ECA\u306E\u5929\u6C17\u306F\uFF0C".concat(currentForecast.weather[0].description, "\u3067\uFF0C\u6C17\u6E29\u306F").concat(parseInt(currentForecast.main.temp, 10), "\u5EA6\u3067\u3059\uFF0E"));
            message.concatString("\u6700\u9AD8\u6C17\u6E29\u306F, ".concat(parseInt(forecastList.maxTemperature(todayForecasts), 10), "\u5EA6\uFF0C\u6700\u4F4E\u6C17\u6E29\u306F").concat(parseInt(forecastList.minTemperature(todayForecasts), 10), "\u5EA6\u3067\u3059\uFF0E"));
            message.concatString(forecastList.concatForecasts(changeForecasts, function (forecast) {
              var utcDateTime = forecastList.zonedTimeToUtc(forecast.dt_txt);
              var time = forecastList.parseTime(utcDateTime);
              var weather = forecast.weather[0].description;
              return "".concat(time, "\u306B").concat(weather, "\u306B\u5909\u308F\u308A\u307E\u3059\n");
            }));
            hasRain = changeForecasts.some(function (forecast) {
              return forecast.weather[0].main === 'Rain';
            });

            if (hasRain) {
              message.concatString("\u96E8\u304C\u964D\u308B\u306E\u3067\uFF0C\u5098\u3092\u6301\u3063\u3066\u884C\u3063\u305F\u307B\u3046\u304C\u3044\u3044\u3067\u3057\u3087\u3046");
            }

            return _context.abrupt("return", message.string);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _generateSpeakString.apply(this, arguments);
}