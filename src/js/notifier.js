import '@babel/polyfill';
import { configCommandLineArgs } from '@kuro-kuroite/prelude';
import speak from './app';

const optionDefinitions = [
  {
    name: 'message',
    alias: 'M',
    defaultValue: 'こんにちは',
    type: String,
    description: 'Google Home が発話する内容',
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
    header: 'circle navi notifier',
    content: 'Google Homeが，コマンドライン引数 message を発話する',
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

(async () => {
  try {
    // eslint-disable-next-line no-console
    await speak(options.message);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
