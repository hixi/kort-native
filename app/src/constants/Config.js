import SecretConfig from './SecretConfig';

const API_VERSION = 'v0.1';

export default {

  API_URL: 'http://cd52634a.ngrok.io',

  DEEP_LINK_URL: 'kortapp://payload?',

  GOOGLE: 'google',
  GOOGLE_IOS_CLIENT_ID: SecretConfig.GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID: SecretConfig.GOOGLE_WEB_CLIENT_ID,

  GOOGLE_VERIFY: '/google/verify',
  OSM_LOGIN: '/osm/login',

  USER_INFO: `/${API_VERSION}/users`,

};
