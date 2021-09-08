const express = require('express');
const DataBase = require('../models/functions');

const router = express.Router();

router.get('/:id/achievements', async (req, res) => {
  try {
    const response = await DataBase.getGameByName(req.params.id);
    console.log(response);
    res.send(response).status(200);
  } catch (e) {
    console.log('the api on backend (host/getnam) failed to fetch.');
    res.json(status(400));
    return e;
  }
});

module.exports = router;
