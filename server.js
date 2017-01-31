const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
