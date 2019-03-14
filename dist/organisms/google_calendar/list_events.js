"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _miniPromisifyGooglecalendar = require("@kuro-kuroite/mini-promisify-googlecalendar");

var _prelude = require("@kuro-kuroite/prelude");

var listEvents = function listEvents(auth, startAt) {
  var endAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _prelude.dateFns.endOfDay(startAt);
  return new Promise(function (resolve, reject) {
    var calendar = _miniPromisifyGooglecalendar.google.calendar('v3');

    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      // TOOD: 取り出す時間を引数で変更できるように拡張
      timeMin: startAt,
      timeMax: endAt,
      singleEvents: true,
      orderBy: 'startTime'
    }, function (err, response) {
      if (err) {
        // eslint-disable-next-line no-console
        console.log("The API returned an error: ".concat(err));
        reject(err);
        return;
      }

      resolve(response.data.items);
    });
  });
};

var _default = listEvents;
exports.default = _default;