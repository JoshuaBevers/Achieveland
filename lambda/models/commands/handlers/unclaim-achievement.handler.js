const ConnectToDatabase = require('../../mongo');

/**
 *
 * @export
 * @function UnclaimAchievement
 * @description Removes user's achievement from the database.
 */

async function unclaimAchievement(gameID, achievementID, user) {
  console.log('hello, this is unclaimAchievement!!');

  try {
    const client = await ConnectToDatabase();
    const collection = client.db('UserAchievements').collection('Achievements');
    // perform actions on the collection object

    const insert = await collection.deleteOne({
      boardgameID: gameID,
      gameAchievementID: achievementID,
      User: user,
    });
    if (insert.insertedCount === 1) {
      return insert;
    } else {
      return 0;
    }
  } catch (e) {
    console.log('the try in claimAchievement has failed.');
    return e;
  }
}

module.exports = unclaimAchievement;
