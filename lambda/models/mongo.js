const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI =
  'mongodb+srv://infernez:' +
  process.env.REACT_APP_MONGO_PSW +
  '@cluster0.jfegp.mongodb.net/' +
  'Achieveland' +
  '?retryWrites=true&w=majority'; // or Atlas connection string

let cachedDb = null;

// const client = new MongoClient(uri, { useUnifiedTopology: true });

function connectToDatabase() {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }).then(
    (db) => {
      cachedDb = db;
      return cachedDb;
    },
  );
}

module.exports = connectToDatabase;
