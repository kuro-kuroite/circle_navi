import { google } from '@kuro-kuroite/mini-promisify-googlecalendar';
import { dateFns } from '@kuro-kuroite/prelude';

const listEvents = (auth, startAt, endAt = dateFns.endOfDay(startAt)) =>
  new Promise((resolve, reject) => {
    const calendar = google.calendar('v3');

    calendar.events.list(
      {
        auth,
        calendarId: 'primary',

        // TOOD: 取り出す時間を引数で変更できるように拡張
        timeMin: startAt,
        timeMax: endAt,

        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, response) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(`The API returned an error: ${err}`);
          reject(err);
          return;
        }

        resolve(response.data.items);
      },
    );
  });

export default listEvents;
