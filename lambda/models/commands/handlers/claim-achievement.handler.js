const ConnectToDatabase = require('../../mongo');

/**
 *
 * @export
 * @function claimAchievement
 * @description claims an achievement for the logged in user.
 */

async function claimAchievement(gameID, achievementID, user) {
  console.log('hello, this is claimAchievement!!');

  try {
    const client = await ConnectToDatabase();
    const collection = client.db('UserAchievements').collection('Achievements');
    // perform actions on the collection object
    const insert = await collection.insertOne({
      boardgameID: gameID,
      gameAchievementID: achievementID,
      User: user,
    });
    if (insert.insertedCount === 1) {
      return insert.ops[0];
    } else {
      return 0;
    }
  } catch (e) {
    console.log('the try in claimAchievement has failed.');
    return e;
  }
}

module.exports = claimAchievement;
