const MongoClient = require('mongodb').MongoClient;

const ConnectToDatabase = require('./mongo');

class Functions {
  static async claimAchievement(gameID, achievementID, user) {
    console.log('hello, this is claimAchievement!!');
    try {
      const client = await ConnectToDatabase();
      const collection = client
        .db('UserAchievements')
        .collection('Achievements');
      // perform actions on the collection object
      const insert = await collection.insertOne({
        boardgameID: gameID,
        gameAchievementID: achievementID,
        User: user,
      });
      // return status okay object.
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }
}

module.exports = Functions;
