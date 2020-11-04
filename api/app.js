const express = require('express');
const axios = require('axios');
const app = express();

const port = 4000;

const appId = '2KRU4V-KTUQG7QQK8';
const output = 'json';

app.get('/getExpression', (req, res) => {
  const { input, width } = req.query;
  axios.get(`https://api.wolframalpha.com/v2/query?input=${input}&appid=${appId}&output=${output}&plotwidth=${width}`)
    .then(response => res.send(response.data && response.data.queryresult))
    .catch(error => {
      console.log(error);
      res.status(401).end();
    });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
