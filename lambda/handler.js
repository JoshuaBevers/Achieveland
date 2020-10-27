'use strict';
const awsServerlessExpress = require('aws-serverless-express');
// const app = require('./routes/search');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.landing = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  awsServerlessExpress.proxy(server, event, context);
};

exports.search = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  awsServerlessExpress.proxy(server, event, context);
};
