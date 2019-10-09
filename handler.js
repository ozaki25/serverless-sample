const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/hello', (req, res) => {
  res.send('Hello');
});

module.exports.hello = serverless(app);
