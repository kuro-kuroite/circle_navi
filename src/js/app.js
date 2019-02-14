import path from 'path';
import './atoms/dotenv';
import './atoms/dirty_mini_promisify_googlecalendar';
import {
  fetchClientSecret,
  withAuthorize,
} from 'mini-promisify-googlecalendar';
import { CalendarEventList } from 'mini-googlecalendar-event';
import {
  OpenWeatherMapProxy,
  OpenWeatherMapForecastList,
} from 'mini-openweathermap';
import { GoogleHomeNotifier } from 'mini-google-home-notifier';
import { listEvents } from './index';

class StringBuffer {
  constructor() {
    this.string = '';
  }

  concatString(string) {
    if (string === '') {
      return;
    }

    this.string += `${string}\n`;
  }
}

const apiKey = process.env.OPEN_WEATHER_MAP_KEY;

// console.log('NOTE: require client_secret.json and token.json');

// TODO: config に移動
const CLIENT_SECRET_PATH = path.resolve(
  __dirname,
  '../',
  process.env.CLIENT_SECRET_PATH,
);
const { GOOGLE_HOME_IP } = process.env;

const listEventsSpec = (clientSecretPath = CLIENT_SECRET_PATH) => {
  fetchClientSecret(clientSecretPath, 'installed')
    .then(credentials => {
      // eslint-disable-next-line no-console
      console.log('fetchClientSecret then');
      return withAuthorize(credentials)
        .then(auth => {
          // eslint-disable-next-line no-console
          console.log('before listEvents');
          return listEvents(auth, new Date().toISOString());
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(`can't not authorise these credeatials`);
          return Promise.reject(err);
        });
    })
    .then(async events => {
      // NOTE: ひとまず，console.log出力とする
      // eslint-disable-next-line no-console
      // console.log('fetched event');
      // eslint-disable-next-line no-console
      // console.log(events);

      const message = new StringBuffer();
      const eventList = new CalendarEventList(events, { language: 'ja' });

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

      // TODO: Proxy に変更
      const openWeatherMapProxy = new OpenWeatherMapProxy(apiKey, {
        city: 'Hachioji,JP',
        lang: 'ja',
      });
      const openWeather = await openWeatherMapProxy.fetchCurrentWeather();

      const forecastList = new OpenWeatherMapForecastList(openWeather);

      const { currentForecast } = forecastList;
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

          return `${time}に${weather}に変わります`;
        }),
      );

      const hasRain = changeForecasts.some(
        forecast => forecast.weather[0].main === 'Rain',
      );
      if (hasRain) {
        message.concatString(
          `雨が降るので，傘を持って行ったほうがいいでしょう`,
        );
      }

      // eslint-disable-next-line no-console
      console.log(message.string);
      const myHome = new GoogleHomeNotifier(GOOGLE_HOME_IP, {
        language: 'ja',
      });

      await myHome.speak(message.string);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('error');
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

try {
  listEventsSpec();
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}
