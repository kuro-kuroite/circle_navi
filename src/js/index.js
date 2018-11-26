import '@babel/polyfill';
// import Promise from 'bluebird';
import { fetchClientSecret, listEvents } from './organisms/google_calendar';

process.on('unhandledRejection', console.dir);

console.log(fetchClientSecret);
// TODO: config に移動
const CLIENT_SECRET_PATH = 'client_secret.json';
console.log('before');
fetchClientSecret(CLIENT_SECRET_PATH, 'installed')
  .then(credentials => {
    console.log('fetchClientSecret then');
    console.log('before listEvents');
    return listEvents(credentials);
  })
  .then(events => {
    // NOTE: ひとまず，console.log出力とする
    //       本来であれば，この出力を Dialogflow に渡す
    console.log('feifjla;fj');
    console.log(events);
  })
  .catch(err => {
    console.log('index');
    console.log(err);
  });
