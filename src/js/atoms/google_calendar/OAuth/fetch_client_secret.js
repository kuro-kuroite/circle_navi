// import Promise from 'bluebird';
import fs from 'fs';

const fetchClientSecret = (path = 'client_secret.json', key = 'installed') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, clientSecret) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(`can't fetch client secret`);
        // eslint-disable-next-line no-console
        console.log('should try to get client_secret.json from google console');
        reject(err);
        return;
      }

      resolve(JSON.parse(clientSecret)[key]);
    });
  });

export default fetchClientSecret;
