const express = require('express');
const router = express.Router();

const dbservice = require('../util/connection');

const Command = require('../models/commands/impl/Command');
const Query = require('../models/query/impl/Query');

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
  const { GameID, User } = req.body;

  try {
    const achievements = await Query.getUserAchievements(GameID, User);
    res.json(achievements).status(200);
    return achievements;
  } catch (e) {
    return e;
  }
});

router.post('/unachievement', jwtCheck, async (req, res) => {
  const { boardgame_id, achievement_id, username } = req.body;
  try {
    //dummy component
    const dbcon = await dbservice();
    const Commands = new Command(dbcon);
    const removeAchievement = await Commands.unclaimAchievement(
      boardgame_id,
      achievement_id,
      username,
    );
    console.log('the removeachievement variable is: ', removeAchievement);
    res.status(200).json(removeAchievement);
    return removeAchievement;
  } catch (e) {
    console.log(e);
    return e;
  }
});

router.post('/achievement', jwtCheck, async (req, res) => {
  const { boardgame_id, achievement_id, username } = req.body;
  try {
    const dbcon = await dbservice();
    const Commands = new Command(dbcon);
    const insertAchievement = await Commands.claimAchievement(
      boardgame_id,
      achievement_id,
      username,
    );
    res.status(200).json(insertAchievement);
  } catch (e) {
    console.log('The error is: ', e);
    res.status(400).send('failed to post to server');
    return e;
  }
});

module.exports = router;
