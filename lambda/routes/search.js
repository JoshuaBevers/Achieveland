const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET search page. */
router.get('/:id', async (req, res) => {
  try {
    //fill below function with with param id
    const response = await DataBase.getGameListJson(req.params.id);

    res.json(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch in search.js.');
    return e;
  }
});

router.get('/letter/:id', async (req, res) => {
  try {
    //fill below function with with param id
    console.log(req.params.id);
    const response = await DataBase.getGamesByLetter(req.params.id);
    res.json(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch all in search.js.');
    return e;
  }
});

router.get('/', async (req, res) => {
  try {
    //fill below function with with param id
    const response = await DataBase.getAllGames();

    res.json(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch all in search.js.');
    return e;
  }
});

module.exports = router;
