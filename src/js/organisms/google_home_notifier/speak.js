import { GoogleHomeNotifier } from '@kuro-kuroite/mini-google-home-notifier';
import { configEnv } from '@kuro-kuroite/prelude';

configEnv();

const { GOOGLE_HOME_NAME_OR_IP, LANGUAGE } = process.env;

export default async function speak(message) {
  const myHome = new GoogleHomeNotifier(GOOGLE_HOME_NAME_OR_IP, {
    language: LANGUAGE,
  });

  await myHome.speak(message);
}
