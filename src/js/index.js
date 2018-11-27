import '@babel/polyfill';
// import Promise from 'bluebird';
import { fetchClientSecret, listEvents } from './organisms/google_calendar';

// TODO: config に移動
const CLIENT_SECRET_PATH = 'client_secret.json';

fetchClientSecret(CLIENT_SECRET_PATH, 'installed')
  .then(credentials => {
    // eslint-disable-next-line no-console
    console.log('fetchClientSecret then');
    // eslint-disable-next-line no-console
    console.log('before listEvents');
    return listEvents(credentials);
  })
  .then(events => {
    // NOTE: ひとまず，console.log出力とする
    //       本来であれば，この出力を Dialogflow に渡す
    // eslint-disable-next-line no-console
    console.log('fetched event');
    // eslint-disable-next-line no-console
    console.log(events);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('error');
    // eslint-disable-next-line no-console
    console.log(err);
  });
