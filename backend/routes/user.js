const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* POST user page. */
router.post('/login', async (req, res) => {
  const { Username, UserPassword } = req.body;
  console.log(Username, UserPassword);

  try {
    const response = await DataBase.getByUsername(Username);
    console.log('hello from user.js!');

    const workData = response;
    if (UserPassword === workData.password) {
      console.log('The password checks out, boss.');
      const { username, first_name, last_name, id } = workData;
      //grab all the achievements from the user and send it forward.
      const userAchievements = await DataBase.fetchAllAchievementsByUser(id);
      console.log('the user achievements are: ', userAchievements);
      const SendingData = {
        username,
        first_name,
        last_name,
        id,
        userAchievements,
      };
      res.json(SendingData).status(200);
    } else {
      if (response === 'No data returned from the query.') {
        res
          .json({
            error:
              'Sorry! That username or password is invalid! Try again, Batman!',
          })
          .status(200);
      } else {
        res
          .json({
            error:
              'Sorry! That username or password is invalid! Try again, Batman!',
          })
          .status(200);
      }
    }
  } catch (e) {
    console.log('the api on backend failed to fetch in user.js.');
    return e;
  }
});

router.post('/create', async (req, res) => {
  const { Username, Password, Email } = req.body;
  try {
    console.log(Username, Password, Email);

    //check to see if username is already in use.
    const nameCheck = await DataBase.checkIfNameIsInUse(Username);

    if (nameCheck === true || Password.length <= 4) {
      if (nameCheck === true) {
        res
          .json({
            error: 'Sorry. That name is taken!',
          })
          .status(200);
      }
      if (Password.length <= 4) {
        console.log('password reject.');
        res
          .json({
            error:
              'Sorry! The password needs to be at least 5 characters long.',
          })
          .status(200);
      }
    } else {
      //insert into the database.
      console.log('firing insert.');
      const insert = await DataBase.createUser(Username, Password, Email);
      console.log(insert);
    }
  } catch (e) {
    console.log('Big failure', e);
  }

  return null;
});

router.post('/achievement', async (req, res) => {
  console.log('hello from database.');
  const { Game, Achievement, User } = req.body;
  console.log('user id: ', User.userID);
  try {
    const insert = await DataBase.claimAchievement(
      Game.id,
      Achievement,
      User.userID,
    );
    console.log(insert);
    return insert;
  } catch (e) {
    return e;
  }
});

module.exports = router;
