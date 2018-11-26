// import Promise from 'bluebird';
import { google } from 'googleapis';
import fetchCredentials from './fetch_credentials';

// TODO: config に移動
const TOKEN_PATH = 'token.json';

const oauthAuthorize = credentials =>
  new Promise((resolve, reject) => {
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
        console.log(`can't fetch token`);
        console.log('should try to authorize oauth by setCredentials method');
        reject(err, oAuth2Client);
      });
  });

export default oauthAuthorize;
