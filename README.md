```bash
mkdir serverless-sample
cd serverless-sample
yarn init -y
sls create -t aws-nodejs
yarn add express serverless-http
serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
yarn deploy
```

```js:handler.js
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello');
});

module.exports.hello = serverless(app);
```

```json:package.json
{
  "scripts": {
    "deploy": "serverless deploy"
  }
}
```

```yml:serverless.yml
service: serverless-sample
provider:
  name: aws
  runtime: nodejs10.x
  region: ap-northeast-1
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /{ANY+}
          method: ANY
          cors: true
```
