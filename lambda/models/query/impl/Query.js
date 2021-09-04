const getUserAchievements = require('../handlers/get-user-achievements.handler');

/**
 *
 * @export
 * @class Command
 *
 */
class Query {
  //bring in service
  dbcon; //connection to database

  constructor(dbservice) {
    this.dbcon = dbservice;
  }

  /**
   *
   * @export
   * @funtion getUserAchivements
   * @description grabs user achievements based on gameID and username
   */
  async getUserAchievements(gameID, username) {
    const dbcon = this.dbcon;
    return getUserAchievements(gameID, username, dbcon);
  }
}

module.exports = Query;
