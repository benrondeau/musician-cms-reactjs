const express = require('express');
const mysql = require('./server/database');

// Database
mysql.connect();
mysql.test();

// Express Config
const app = express();
app.set('port', (process.env.PORT || 5002));
app.use(express.static(`${__dirname}/dist`));

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});
