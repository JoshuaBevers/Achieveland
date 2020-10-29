const MongoClient = require('mongodb').MongoClient;

const uri =
  'mongodb+srv://infernez:<' +
  process.env.REACT_APP_MONGO_PSW +
  '>@cluster0.jfegp.mongodb.net/<dbname>?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true });

const gamebase = require('../data/boardgames.json');

class Functions {
  static async claimAchievement(gameID, achievementID, user) {
    console.log('hello!');
    try {
      client.connect((err) => {
        const collection = client
          .db('UserAchievements')
          .collection('Achievements');
        // perform actions on the collection object
        collection.insert({
          boardgameID: gameID,
          gameAchievementID: achievementID,
          User: user,
        });

        client.close();
      });
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }
}
