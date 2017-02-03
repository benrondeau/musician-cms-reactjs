const express = require('express');
const helmet = require('helmet'); // set security-related HTTP headers
const compression = require('compression'); // gzip responses, speed things up

// Database
const mysql = require('mysql'); // eslint-disable-line
if (process.env.CLEARDB_DATABASE_URL === undefined) {
  require('dotenv').config(); // eslint-disable-line
}

const knex = require('knex')({ client: 'mysql', connection: process.env.CLEARDB_DATABASE_URL });

// Express Config
const app = express();
app.use(express.static('dist')); // serve files from this folder
app.use(helmet());
app.use(compression());
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});

// API
app.route('/api/event')
  .get((req, res) => {
    knex.select() // return all results matching
      .from('music_events') // from this table
      .where({ event_title: mysql.escape('SXSW') })
      .then((results) => {
        res.json(results);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
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

