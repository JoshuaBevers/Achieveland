const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

router.post('/', async (req, res) => {
  console.log('hello from create-user.js');
  //check to see if username is already in use.
  //if not in use, insert into database and send the goahead forward.

  return Response;
});
