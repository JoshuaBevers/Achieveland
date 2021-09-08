const UserAchievement = require('../../domain/userAchievement');

/**
 *
 * @export
 * @function UnclaimAchievement
 * @description Removes user's achievement from the database.
 */

async function unclaimAchievement(gameID, achievementID, user, dbConnection) {
  const userAchievement = new UserAchievement(gameID, achievementID, user);
  const insert = await userAchievement.delete(dbConnection);
  return insert;
}

module.exports = unclaimAchievement;
