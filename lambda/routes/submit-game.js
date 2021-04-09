const express = require('express');

const router = express.Router();
const MongoDataBase = require('../models/mongo-functions');
const domain = process.env.REACT_APP_DOMAIN_URL;

//transporter

const handleFormat = (contributor, UserStack) => {
  const correctedFormat = UserStack.map((x) => {
    const {
      id,
      achievementName,
      achievementDescription,
      achievementDifficulty,
    } = x;
    return {
      id,
      name: achievementName,
      description: achievementDescription,
      difficutly: achievementDifficulty,
      contributor,
    };
  });
  console.log(correctedFormat);
  return correctedFormat;
};

const validateData = (contributor, gameName, userStack) => {
  //super light data testing for intital setup.

  //test contributor
  if (typeof contributor !== 'string') {
    console.log('failed at contributor');
    return false;
  }
  //test gameName
  if (typeof gameName !== 'string') {
    console.log('failed at gameName');
    return false;
  }

  //test userStack

  if (userStack.length >= 20) {
    console.log('possible databomb.');
    return false;
  }

  userStack.forEach((x) => {
    const {
      id,
      achievementName,
      achievementDescription,
      achievementDifficulty,
    } = x;
    console.log(typeof id);

    if (
      typeof id !== 'number' ||
      typeof achievementName !== 'string' ||
      typeof achievementDescription !== 'string' ||
      typeof achievementDifficulty !== 'string'
    ) {
      meta = false;
    }
  });

  let meta = true;
  if (meta === false) {
    console.log('failed at meta.');
    return false;
  }

  return true;
};

router.post('/', async function (req, res, next) {
  const { contributor, gameName, UserStack } = req.body;
  console.log('if statement about to fire.', contributor, gameName, UserStack);

  if (validateData(contributor, gameName, UserStack) != false) {
    const newformat = handleFormat(contributor, UserStack);
    console.log('about to try and post to mongo', newformat);
    try {
      console.log('the game and achivements post was successful ');
      const postedAchievements = await MongoDataBase.postAchievement(newformat);
      console.log('the achievement return is: ', postedAchievements);
      res.json(postedAchievements.insertedCount).status(200);
    } catch (e) {
      return e;
    }
  } else {
    res.json('failed').status(403);
  }
});

module.exports = router;
