// import Promise from 'bluebird';
import { google } from 'googleapis';
import fetchCredentials from './fetch_credentials';

// TODO: config に移動
const TOKEN_PATH = 'token.json';

const oauthAuthorize = credentials =>
  new Promise((resolve, reject) => {
    // HACK: credential json has camelcase keys
    // eslint-disable-next-line camelcase
    const { client_secret, client_id, redirect_uris } = credentials;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    fetchCredentials(TOKEN_PATH)
      .then(token => {
        oAuth2Client.setCredentials(token);
        resolve(oAuth2Client);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(`can't fetch token`);
        // eslint-disable-next-line no-console
        console.log('should try to authorize oauth and call setCredentials');
        reject(err, oAuth2Client);
      });
  });

export default oauthAuthorize;
