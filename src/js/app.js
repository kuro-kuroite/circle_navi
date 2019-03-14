import '@babel/polyfill';
import path from 'path';
import { configCommandLineArgs } from '@kuro-kuroite/prelude';
import generateSpeakString from './generate_speak_string';
import { speak } from './index';

const optionDefinitions = [
  {
    name: 'events',
    alias: 'E',
    defaultValue: 'events.json',
    type: String,
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
    content: 'this is collect weather and event data and generate content',
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

(async () => {
  try {
    // eslint-disable-next-line no-console
    await speak(await generateSpeakString(eventsPath, weathersPath));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
