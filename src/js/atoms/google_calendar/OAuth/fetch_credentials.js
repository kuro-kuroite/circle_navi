// import Promise from 'bluebird';
import fs from 'fs';

const fetchCredentials = (path = 'token.json') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, token) => {
      if (err) {
        console.log('should setup token');
        // NOTE: 外部に委託
        reject(err);
      }

      console.log('token ok 後で消す');
      resolve(JSON.parse(token));
    });
  });

export default fetchCredentials;
