import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export const oauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  'postmessage'
);
