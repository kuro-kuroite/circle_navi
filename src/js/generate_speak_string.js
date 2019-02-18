import '@babel/polyfill';
import { configEnv, fsAsync, StringBuffer } from '@kuro-kuroite/prelude';
import { CalendarEventList } from '@kuro-kuroite/mini-googlecalendar-event';
import { OpenWeatherMapForecastList } from '@kuro-kuroite/mini-openweathermap';

configEnv();

const { LANGUAGE } = process.env;

export default async function generateSpeakString(eventFile, openWeatherFile) {
  const message = new StringBuffer();
  const events = JSON.parse(await fsAsync.readFile(eventFile, 'utf8'));
  const eventList = new CalendarEventList(events, { language: LANGUAGE });
  const openWeather = JSON.parse(
    await fsAsync.readFile(openWeatherFile, 'utf8'),
  );
  const forecastList = new OpenWeatherMapForecastList(openWeather);
  const { currentForecast } = forecastList;

  const eventsContent = eventList.concatEvents(
    events,
    (name, place, startTimesOfDay) => {
      const startTimeOfDayPhrase = startTimesOfDay
        ? `${startTimesOfDay}から，`
        : '';
      const placePhrase = place !== '' ? `${place}で` : '';

      return `${startTimeOfDayPhrase}${placePhrase}${name}\n`;
    },
  );
  message.concatString(eventsContent);

  const todayForecasts = forecastList.filterForecastsByDateTime(
    forecastList.toDate(currentForecast.dt_txt),
  );
  const changeForecasts = forecastList.changeForecasts(todayForecasts);

  message.concatString(
    `ただ今の天気は，${
      currentForecast.weather[0].description
    }で，気温は${parseInt(currentForecast.main.temp, 10)}度です．`,
  );
  message.concatString(
    `最高気温は, ${parseInt(
      forecastList.maxTemperature(todayForecasts),
      10,
    )}度，最低気温は${parseInt(
      forecastList.minTemperature(todayForecasts),
      10,
    )}度です．`,
  );
  message.concatString(
    forecastList.concatForecasts(changeForecasts, forecast => {
      const utcDateTime = forecastList.zonedTimeToUtc(forecast.dt_txt);
      const time = forecastList.parseTime(utcDateTime);
      const weather = forecast.weather[0].description;

      return `${time}に${weather}に変わります\n`;
    }),
  );

  const hasRain = changeForecasts.some(
    forecast => forecast.weather[0].main === 'Rain',
  );
  if (hasRain) {
    message.concatString(`雨が降るので，傘を持って行ったほうがいいでしょう`);
  }

  return message.string;
}
