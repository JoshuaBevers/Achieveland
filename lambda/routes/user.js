const express = require('express');

const router = express.Router();

// const DataBase = require('../models/functions');
const MongoDataBase = require('../models/mongo-functions');

var jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const domain = process.env.REACT_APP_DOMAIN_URL;

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: domain,
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: process.env.REACT_APP_AUTH0_ISSUER,
  algorithms: ['RS256'],
});
const checkScopes = jwtAuthz(['read:current_user']);

router.use(jwtCheck);

router.post('/achievelist', jwtCheck, async (req, res) => {
  console.log('fetching user achievements in achievelist.');
  const { GameID, User } = req.body;

  try {
    const achievements = await MongoDataBase.getUserAchievements(GameID, User);
    console.log('the achievement return is: ', achievements);
    res.json(achievements).status(200);
    return achievements;
  } catch (e) {
    return e;
  }
});

router.post('/unachievement', jwtCheck, async (req, res) => {
  console.log('hello from database.');
  const { Game, Achievement, User } = req.body;
  try {
    const insert = await MongoDataBase.unclaimAchievement(
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

router.post('/achievement', jwtCheck, async (req, res) => {
  console.log('hello from database.');
  const { Game, Achievement, User } = req.body;
  try {
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
