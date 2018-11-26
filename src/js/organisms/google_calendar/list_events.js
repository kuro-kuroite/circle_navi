import { withAuthorize } from '../../molecules/google_calendar';
import { listEvents as _listEvents } from '../../molecules/google_calendar';

const listEvents = credentials => {
  console.log('before withAuthorize');
  return withAuthorize(credentials)
    .then(oauth2client => _listEvents(oauth2client))
    .then(events => events)
    .catch(err => {
      console.log(`can't not authorise these credeatials`);
      return err;
    });
};
export default listEvents;
