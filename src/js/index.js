import '@babel/polyfill';
// NOTE: see https://www.npmjs.com/package/actions-on-google
// NOTE: because of CMS library, it needs to rename *
import * as functions from 'firebase-functions';

// Register handlers for Dialogflow intents
import app from './organisms/hello_world';

// NOTE: Dialog Inline Editor requires to export it as CMS types
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
