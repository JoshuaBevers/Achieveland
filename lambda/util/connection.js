const ConnectToDatabase = require('../models/mongo');

async function connection() {
  try {
    const client = await ConnectToDatabase();
    const collection = client.db('UserAchievements').collection('Achievements');
    return collection;
  } catch (e) {
    console.log(e);
  }
}

module.exports = connection;
