const express = require('express');
const DataBase = require('../models/functions');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await DataBase.getGameByName(req.headers.game);
    console.log(req.headers);
    console.log(response);
    res.send(response).status(200);
  } catch (e) {
    console.log('the api on backend (host/getanem) failed to fetch.');
    res.json(status(400));
    return e;
  }
});

module.exports = router;
