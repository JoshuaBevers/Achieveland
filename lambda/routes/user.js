const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');
const MongoDataBase = require('../models/mongo-functions');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const domain = process.env.REACT_APP_DOMAIN_URL;

// const jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: domain,
//   }),
//   // audience: process.env.AUTH0_AUDIENCE,
//   issuer: process.env.AUTH0_ISSUER,
//   algorithms: ['RS256'],
// });

// router.use(jwtCheck);

router.post('/achievelist', async (req, res) => {
  console.log('fetching user achievements in achievelist.');
  const { GameID, User } = req.body;
  console.log('the user is: ', User);
  console.log('the game is: ', GameID);

  try {
    const achievements = await MongoDataBase.getUserAchievements(GameID, User);
    res.json(achievements).status(200);
    return achievements;
  } catch (e) {
    return e;
  }
});

router.post('/unachievement', async (req, res) => {
  console.log('hello from database.');
  const { Game, Achievement, User } = req.body;
  console.log('user id: ', User);
  try {
    // hold on to this.
    const insert = await DataBase.unclaimAchievement(
      Game.id,
      Achievement,
      User,
    );
    res.status(200);
    return insert;
  } catch (e) {
    return e;
  }
});

router.post('/achievement', async (req, res) => {
  console.log('hello from database.');
  const { Game, Achievement, User } = req.body;
  console.log('user id: ', User);
  try {
    // hold on to this.
    const insert = await MongoDataBase.claimAchievement(
      Game.id,
      Achievement,
      User,
    );
    console.log('made it past the insert, which is: ', insert);
    res.json(insert);
  } catch (e) {
    console.log('The error is: ', e);
    return e;
  }
});

module.exports = router;
