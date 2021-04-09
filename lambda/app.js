const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const search = require('./routes/search');
const getName = require('./routes/gamename');
const User = require('./routes/user');
const SubmitGame = require('./routes/submit-game');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(logger('the app has loaded and is about to mount index.'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/search', search);
app.use('/game', getName);
app.use('/user', User);
app.use('/sub-game', SubmitGame);

app.use('/', indexRouter);

module.exports = app;
