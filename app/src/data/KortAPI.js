import RestClient from 'react-native-rest-client';
import ReactNativeI18n from 'react-native-i18n';
import Config from '../constants/Config';

export default class KortAPI extends RestClient {

    constructor(authToken) {
    super(Config.API_URL, {
      headers: {
        Authorization: `${authToken}`
      },
      simulatedDelay: 0
    });
  }
  
  verifyUser(tokenId) {
    return this.POST(Config.GOOGLE_VERIFY, { tokenId });
  }

  getUserinfo(userId) {
    console.log(`${Config.USER_INFO}/${userId}`);
    return this.GET(`${Config.USER_INFO}/${userId}`);
  }

  getMissions(lat, lon, radius, userId) {
    return this.GET(Config.MISSIONS, { lat, lon, radius, lang: this.getLocale(), user_id: userId });
  }

  getMissionGeometry(osmType, osmId) {
    return this.GET(`${Config.MISSIONS}/osm/${osmType}/${osmId}`);
  }

  sendSolution(schemaId, errorId, newSolution) {
    const solution = Object.assign({}, newSolution);
    solution.lang = this.getLocale();
    return this.POST(`${Config.MISSIONS}/${schemaId}/${errorId}/solution`, { solution });
  }

  getHighscore(type, limit) {
    console.log(type, limit);
    return this.GET(Config.HIGHSCORE, { type, limit });
  }

  getAchievements(userId) {
    return this.GET(Config.ACHIEVEMENTS, { user_id: userId, lang: this.getLocale() });
  }

  getLocale() {
    return ReactNativeI18n.locale;
  }
 
}
