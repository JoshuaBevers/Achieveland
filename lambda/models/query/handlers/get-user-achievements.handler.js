const ConnectToDatabase = require('../../mongo');

/**
 *
 * @export
 * @function getUserAchievements
 * @description Grabs user's achievements based on gameid and username.
 */

async function getUserAchievements(gameID, user, dbcon) {
  console.log('Hello, this function should be grabbing the user achievements');
  try {
    // perform actions on the collection object
    const query = await dbcon.find({ boardgameID: gameID, User: user });
    const queryParse = await query.toArray();
    console.log(queryParse, query);
    return queryParse;
  } catch (e) {
    console.log('the try in claimAchievement has failed.');
    return e;
  }
}

module.exports = getUserAchievements;
