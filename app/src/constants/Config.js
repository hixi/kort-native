import SecretConfig from './SecretConfig';

const API_VERSION = 'v0.1';

export default {

  MAPBOX_ACCESS_TOKEN: SecretConfig.MAPBOX_ACCESS_TOKEN,
  MAPBOX_INITIAL_COORD_LATITUDE: 46.808337,
  MAPBOX_INITIAL_COORD_LONGITUDE: 9.839493,
  MAPBOX_INITIAL_ZOOM_LEVEL: 12,
  MAPBOX_MISSION_ZOOM_LEVEL: 17,
  MAPBOX_ANNOTATION_SIZE: 30,
  MAPBOX_TAP_DELAY_IN_MS: 250,
  MAPBOX_DRAG_DELAY_IN_MS: 450,

  API_URL: 'http://3285b49a.ngrok.io',

  DEEP_LINK_URL: 'kortapp://payload?',

  GOOGLE: 'google',
  GOOGLE_IOS_CLIENT_ID: SecretConfig.GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID: SecretConfig.GOOGLE_WEB_CLIENT_ID,

  GOOGLE_VERIFY: '/google/verify',
  OSM_LOGIN: '/osm/login',

  USER_INFO: `/${API_VERSION}/users`,
  MISSIONS: `/${API_VERSION}/missions`,
  HIGHSCORE: `/${API_VERSION}/highscore`,
  ACHIEVEMENTS: `/${API_VERSION}/achievements`,

  RADIUS_IN_M_FOR_MISSION_FETCHING: 5000,
  DISTANCE_DIFF_IN_M_FOR_MISSION_FETCHING: 1000,
  ADDITIONAL_KOINS_FOR_STATS: 1,

  HIGHSCORE_LIMIT: 10,

  KORT_GITHUB: 'https://github.com/kort/kort-native',
  KORT_USERVOICE: 'https://kort.uservoice.com/',
  KORT_WEBSITE: 'www.kort.ch'

};
