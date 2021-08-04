// const claim = require('../handlers/claim-achievement.handler');
const claimAchievements = require('../handlers/claim-achievement.handler');
const unclaimAchievements = require('../handlers/unclaim-achievement.handler');

class Command {
  /**
   *
   * @export
   * @claimAchievement
   * @description claims an achivement given the params Game ID, AchievementID, and a user e-mail labeled username.
   */
  static async claimAchievement(gameID, achievementID, user) {
    return claimAchievements(gameID, achievementID, user);
  }

  /**
   *
   * @export
   * @unclaimAchievement
   * @description reoves a claimed achivement given the params Game ID, AchievementID, and a user e-mail labeled username from the database.
   */
  static async unclaimAchievement(gameID, achievementID, user) {
    return unclaimAchievements(gameID, achievementID, user);
  }
}

module.exports = Command;
