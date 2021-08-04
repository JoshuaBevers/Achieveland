const ConnectToDatabase = require('../../mongo');

/**
 *
 * @export
 * @class getUserAchievements
 * @description Grabs user's achievements based on gameid and username.
 */

async function getUserAchievements(gameID, user) {
  console.log('Hello, this function should be grabbing the user achievements');
  try {
    const client = await ConnectToDatabase();
    const collection = client.db('UserAchievements').collection('Achievements');
    // perform actions on the collection object
    const query = await collection.find({ boardgameID: gameID, User: user });
    const queryParse = await query.toArray();
    return queryParse;
  } catch (e) {
    console.log('the try in claimAchievement has failed.');
    return e;
  }
}

module.exports = getUserAchievements;
