const UserAchievement = require('../../domain/userAchievement');

/**
 *
 * @export
 * @function claimAchievement
 * @description claims an achievement for the logged in user.
 */

async function claimAchievement(gameID, achievementID, user, dbConnection) {
  console.log('hello, this is claimAchievement!!');
  const userAchievement = new UserAchievement(gameID, achievementID, user);
  const insert = await userAchievement.create(dbConnection);
  return insert;
}

module.exports = claimAchievement;
