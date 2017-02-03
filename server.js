const express = require('express');
const mysql = require('./server/database');

// Database
mysql.connect();

// Express Config
const app = express();
app.use(express.static('dist'));

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.get('/api', (request, response) => {
  mysql.createNewTable();
  response.send(200); // just a dummy response so the page doesn't hang....
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});
