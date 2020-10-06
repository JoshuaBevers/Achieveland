const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    console.log('the requested header is: ', req.headers.game);
    const response = await DataBase.getGameListJson(req.headers.game);
    console.log('hello from test.js!');
    console.log('the response is: ', response);
    console.log(req.headers);

    res.json(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch in search.js.');
    return e;
  }
});

module.exports = router;
