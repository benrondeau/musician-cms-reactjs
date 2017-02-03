const express = require('express');
const mysql = require('./server/database');

// Database
mysql.getDBcontents(); // retrieve and cache music events in memory.

// Express Config
const app = express();
app.use(express.static('dist'));

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});
