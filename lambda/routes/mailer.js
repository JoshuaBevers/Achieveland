const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

//transporter

router.post('/', function (req, res, next) {
  console.log('we were posted');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'test-email@gmail.com',
      pass: 'test123',
    },
  });

  const mailOptions = {
    from: `${req.body.email}`,
    to: 'infernezor@gmail.com',
    subject: `${req.body.name}`,
    text: `${req.body.message}`,
    replyTo: `${req.body.email}`,
  };
});

module.exports = router;
