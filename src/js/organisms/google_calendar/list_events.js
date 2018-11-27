import {
  listEvents as _listEvents,
  withAuthorize,
} from '../../molecules/google_calendar';

const listEvents = credentials =>
  withAuthorize(credentials)
    .then(oauth2client => _listEvents(oauth2client))
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(`can't not authorise these credeatials`);
      return Promise.reject(err);
    });

export default listEvents;
