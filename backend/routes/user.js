const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const domain = process.env.REACT_APP_DOMAIN_URL;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: domain,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
});

router.use(jwtCheck);

router.post('/achievelist', jwtCheck, async (req, res) => {
  console.log('fetching user achievements.');
  const { User, game } = req.body;
  console.log('the user is: ', User);
  console.log('the game is: ', game);
  const achievements = await DataBase.getUserAchievements(game.id, User);
  res.json(achievements).send(200);
  return achievements;
});

router.post('/achievement', jwtCheck, async (req, res) => {
  console.log('hello from database.');
  const { Game, Achievement, User } = req.body;
  console.log('user id: ', User);
  try {
    // hold on to this.
    const insert = await DataBase.claimAchievement(Game.id, Achievement, User);
    res.send(200);
    return insert;
  } catch (e) {
    return e;
  }
});

module.exports = router;
