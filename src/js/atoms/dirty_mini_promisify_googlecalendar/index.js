import path from 'path';
import * as oauthAuthorize from 'mini-promisify-googlecalendar/dist/atoms/google_calendar/OAuth/oauth_authorize';

// HACK: TOKEN_PATH を強制的に変更
oauthAuthorize.TOKEN_PATH = path.resolve(
  __dirname,
  '../',
  process.env.TOKEN_PATH,
);
