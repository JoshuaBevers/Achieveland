const express = require('express');

const router = express.Router();

// const DataBase = require('../models/functions');

/* GET search page. */
router.get('/', async (req, res) => {
  res.send('begin the search!');
  try {
    // const response = await DataBase.getGameListJson(req.headers.game);
    console.log('hello from the search function, lambda!');

    res.send('sending from search.');
    // res.json(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch in search.js.');
    return e;
  }
});

module.exports = router;
