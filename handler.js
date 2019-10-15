const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const app = express();

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());
app.use(cors());

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.get('/todo', async (req, res, next) => {
  const params = {
    TableName: 'serverless-sample-dev-todo',
  };
  try {
    const result = await dynamo
      .scan(params, error => {
        if (error) throw new Error(error.stack);
      })
      .promise();
    res.send(result.Items);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

app.post('/todo', async (req, res, next) => {
  const { text } = req.body;
  const params = {
    TableName: 'serverless-sample-dev-todo',
    Item: { id: uuid(), text },
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
