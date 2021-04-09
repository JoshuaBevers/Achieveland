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
      console.log('the insert response is: ', insert.insertedCount);
      if (insert.insertedCount === 1) {
        return insert;
      }
      // return status okay object. to be done.
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }

  static async getUserAchievements(gameID, user) {
    console.log(
      'Hello, this function should be grabbing the user achievements',
    );
    try {
      const client = await ConnectToDatabase();
      const collection = client
        .db('UserAchievements')
        .collection('Achievements');
      // perform actions on the collection object
      const query = await collection.find({ boardgameID: gameID, User: user });
      const queryParse = await query.toArray();
      console.log('the getUserAchievements parse is: ', queryParse);
      return queryParse;
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }

  static async unclaimAchievement(achievementID, user) {
    console.log(
      'Hello, this is function should be removing the achievement from the user achievements',
    );
    try {
      console.log('trying to remove: ', achievementID.id, user);
      const client = await ConnectToDatabase();
      const collection = client
        .db('UserAchievements')
        .collection('Achievements');
      // perform actions on the collection object

      const query = await collection.deleteOne({
        gameAchievementID: achievementID.id,
        User: user,
      });

      console.log('query parse is: ', query);
      return query;
    } catch (e) {
      console.log('the try in unclaimAchievement has failed.');
      console.log(e);
      return e;
    }
  }

  static async postAchievement(pack) {
    console.log(
      'Hello, this is function should be adding requested user achievement to be reviewed.',
    );
    try {
      console.log('trying to add: ', pack);
      const client = await ConnectToDatabase();
      const collection = client
        .db('UserAchievements')
        .collection('requestedAchievements');
      // perform actions on the collection object

      const query = await collection.insertOne({ packaged: pack[0] });

      console.log('query parse is: ', query);
      return query;
    } catch (e) {
      console.log('the try in postAchievement has failed.');
      console.log(e);
      return e;
    }
  }
}

module.exports = Functions;
