// import Promise from 'bluebird';
import { oauthAuthorize } from '../../atoms/google_calendar/OAuth';

const withAuthorize = credentials => {
  console.log('withAuthorize');
  return new Promise((resolve, reject) => {
    oauthAuthorize(credentials)
      .then(oAuth2Client => {
        console.log('in withAuthorize');
        resolve(oAuth2Client);
      })
      .catch((err, oAuth2Client) => {
        // TODO: ここに，getAccessToken をしてうまくいったら，resolve
        //       うまくいかなければ，reject(err) する
        reject(err);
      });
  });
};
export default withAuthorize;
