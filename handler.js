const serverless = require('serverless-http');
const express = require('express');
const app = express();

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.post('/todo', async (req, res, next) => {
  const params = {
    TableName: 'serverless-sample-dev-todo',
    Item: {
      id: String(Date.now()),
      text: 'TODOです',
    },
  };
  try {
    await dynamo
      .put(params, error => {
        if (error) throw new Error(error.stack);
      })
      .promise();
    res.send(params);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports.hello = serverless(app);
