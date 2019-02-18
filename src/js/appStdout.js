import '@babel/polyfill';
import path from 'path';
import { configCommandLineArgs, configEnv } from '@kuro-kuroite/prelude';
import { GoogleHomeNotifier } from '@kuro-kuroite/mini-google-home-notifier';
import generateSpeakString from './generate_speak_string';

configEnv();

const { GOOGLE_HOME_NAME, LANGUAGE } = process.env;

const optionDefinitions = [
  {
    name: 'events',
    alias: 'E',
    type: String,
    defaultValue: 'events.json',
    description: 'absolute json file path about events',
  },
  {
    name: 'weathers',
    alias: 'W',
    type: String,
    defaultValue: 'weathers.json',
    description: 'absolute json file path about weathers',
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'show help',
  },
];

const sections = [
  {
    header: 'circle navi',
    content:
      'this is collect weather and event data and generate content to speak',
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
];

const options = configCommandLineArgs(
  optionDefinitions,
  sections,
  process.argv,
);

const eventsPath = path.resolve(__dirname, '../', options.events);
const weathersPath = path.resolve(__dirname, '../', options.weathers);

export default async function speak(message) {
  const myHome = new GoogleHomeNotifier(GOOGLE_HOME_NAME, {
    language: LANGUAGE,
  });

  await myHome.speak(message);
}

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log(await generateSpeakString(eventsPath, weathersPath));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
