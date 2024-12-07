const serverless = require('serverless-http');
const app = require('../api/app'); // Make sure the path is correct

module.exports.handler = serverless(app);
