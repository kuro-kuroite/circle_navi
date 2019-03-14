import '@babel/polyfill';
import path from 'path';
import { configEnv, fsAsync } from '@kuro-kuroite/prelude';
import { withAuthorize } from '@kuro-kuroite/mini-promisify-googlecalendar';
import { listEvents } from './index';

configEnv();

const tokenPath = path
  .resolve(__dirname, '../', process.env.TOKEN_PATH)
  .toString();
console.log(tokenPath);
const clientSecretPath = path
  .resolve(__dirname, '../', process.env.CLIENT_SECRET_PATH)
  .toString();

export default async function main(
  fileName = path.resolve(__dirname, '../', 'events.json'),
) {
  const auth = await withAuthorize(tokenPath, clientSecretPath);

  const events = await listEvents(auth, new Date().toISOString());

  await fsAsync.writeFile(fileName, JSON.stringify(events, null, '  '));
}

(async () => {
  try {
    await main();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
