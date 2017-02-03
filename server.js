const express = require('express');
const mysql = require('./server/database');
const helmet = require('helmet'); // set security-related HTTP headers
const compression = require('compression'); // gzip responses, speed things up

// Database
mysql.getDBcontents(); // retrieve and cache music events in memory.

// Express Config
const app = express();
app.use(express.static('dist')); // serve files from this folder
app.use(helmet());
app.use(compression());

// Homepage
app.get('/', (request, response) => {
  response.sendFile('index.html');
});

// API
app.route('/api/event')
  .get((req, res) => {
    // Filter request params
    // build SQL query
    // execute query
    // return results
    res.send('Get a random book');
  })
  .post((req, res) => {
    // Filter request params
    // build SQL query
    // Add timestamps for created_at or updated_at
    // execute query
    // return results
    res.send('Add a book');
  })
  .put((req, res) => {
    // Filter request params
    // build SQL query
    // Add timestamps for created_at or updated_at
    // execute query
    // return results
    res.send('Update the book');
  })
  .delete((req, res) => {
    // Filter request params
    // build SQL query
    // execute query
    // return results
    res.send('Update the book');
  });


app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});
