// import Promise from 'bluebird';
import fs from 'fs';

const fetchClientSecret = (path = 'client_secret.json', key = 'installed') => {
  console.log('fetch client secret ...');
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, clientSecret) => {
      if (err) {
        console.log(`can't fetch client secret`);
        console.log('should try to get client_secret.json from google console');
        reject(err);
      }
      resolve(JSON.parse(clientSecret)[key]);
    });
  });
};
export default fetchClientSecret;
