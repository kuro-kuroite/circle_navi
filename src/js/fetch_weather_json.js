import '@babel/polyfill';
import path from 'path';
import { configEnv, fsAsync } from '@kuro-kuroite/prelude';
import { OpenWeatherMapProxy } from '@kuro-kuroite/mini-openweathermap';

configEnv();

const { OPEN_WEATHER_MAP_KEY, OPEN_WEATHER_MAP_CITY, LANGUAGE } = process.env;

export default async function main(
  fileName = path.resolve(__dirname, '../', 'weathers.json'),
) {
  const openWeatherMapProxy = new OpenWeatherMapProxy(OPEN_WEATHER_MAP_KEY, {
    city: OPEN_WEATHER_MAP_CITY,
    lang: LANGUAGE,
  });
  const openWeather = await openWeatherMapProxy.fetchCurrentWeather();

  await fsAsync.writeFile(fileName, JSON.stringify(openWeather, null, '  '));
}

(async () => {
  try {
    await main();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
