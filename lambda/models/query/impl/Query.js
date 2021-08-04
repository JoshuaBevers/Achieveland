const getUserAchievements = require('../handlers/get-user-achievements.handler');

class Query {
  static async getUserAchievements(gameID, username) {
    return getUserAchievements(gameID, username);
  }
}

module.exports = Query;
