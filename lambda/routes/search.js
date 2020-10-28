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

module.exports = router;
