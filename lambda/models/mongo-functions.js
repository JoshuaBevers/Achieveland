const MongoClient = require('mongodb').MongoClient;

const ConnectToDatabase = require('./mongo');

const client = await ConnectToDatabase();
const collection = client.db('UserAchievements').collection('Achievements');

class Functions {
  static async claimAchievement(gameID, achievementID, user) {
    console.log('hello, this is claimAchievement!!');
    try {
      // perform actions on the collection object
      const insert = await collection.insertOne({
        boardgameID: gameID,
        gameAchievementID: achievementID,
        User: user,
      });
      // return status okay object. to be done.
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }

  static async getUserAchievements(gameID, user) {
    console.log(
      'Hello, this is function should be grabbing the user achievements',
    );
    try {
      // perform actions on the collection object
      const query = await collection.find({
        boardgameID: gameID,
        User: user,
      });
      // return status okay object. to be done.
      return query;
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }
}

module.exports = Functions;
