// import Promise from 'bluebird';
import { oauthAuthorize } from '../../atoms/google_calendar/OAuth';

const withAuthorize = credentials =>
  new Promise((resolve, reject) => {
    oauthAuthorize(credentials)
      .then(oAuth2Client => {
        // eslint-disable-next-line no-console
        console.log('in withAuthorize');
        resolve(oAuth2Client);
      })
      // HACK: TODO uses oAuth2Client by getAccessToken or others
      // eslint-disable-next-line no-unused-vars
      .catch((err, oAuth2Client) => {
        // TODO: ここに，getAccessToken をしてうまくいったら，resolve
        //       うまくいかなければ，reject(err) する
        // eslint-disable-next-line no-console
        console.log('TODO: create getAccessToken with Dialogflow');
        reject(err);
      });
  });

export default withAuthorize;
