import Promise from 'bluebird';
import { google } from '../../atoms/google_calendar';

const listEvents = auth =>
  new Promise((resolve, reject) => {
    const calendar = google.calendar('v3');

    calendar.events.list(
      {
        auth,
        calendarId: 'primary',

        // TOOD: 取り出す時間を引数で変更できるように拡張
        timeMin: new Date(Date.parse('2018-07-16')).toISOString(),
        timeMax: new Date(Date.parse('2018-07-19')).toISOString(),

        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          reject(err);
        }

        resolve(response.data.items);
      },
    );
  });

export default listEvents;
