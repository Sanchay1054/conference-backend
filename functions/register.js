const serverless = require('serverless-http');
const app = require('../app'); // Make sure the path is correct

module.exports.handler = serverless(app);
