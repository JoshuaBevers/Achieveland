// const claim = require('../handlers/claim-achievement.handler');
const claimAchievements = require('../handlers/claim-achievement.handler');
const unclaimAchievements = require('../handlers/unclaim-achievement.handler');

/**
 *
 * @export
 * @class Command
 *
 */

class Command {
  //bring in service
  dbcon; //connection to database

  constructor(dbservice) {
    this.dbcon = dbservice;
  }
  /**
   *
   * @export
   * @funtion claimAchievement
   * @description claims an achivement given the params Game ID, AchievementID, and a user e-mail labeled username.
   */
  async claimAchievement(gameID, achievementID, user) {
    const dbcon = this.dbcon;
    return claimAchievements(gameID, achievementID, user, dbcon);
  }

  /**
   *
   * @export
   * @unclaimAchievement
   * @description reoves a claimed achivement given the params Game ID, AchievementID, and a user e-mail labeled username from the database.
   */
  async unclaimAchievement(gameID, achievementID, user) {
    const dbcon = this.dbcon;
    return unclaimAchievements(gameID, achievementID, user, dbcon);
  }
}

module.exports = Command;
