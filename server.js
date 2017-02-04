const express = require('express');
const helmet = require('helmet'); // set security-related HTTP headers
const compression = require('compression'); // gzip responses, speed things up
const expressValidator = require('express-validator');
const mysql = require('mysql');

if (process.env.CLEARDB_DATABASE_URL === undefined) {
  require('dotenv').config(); // eslint-disable-line
}

const knex = require('knex')({ client: 'mysql', connection: process.env.CLEARDB_DATABASE_URL });

// Express Config
const app = express();
app.use(expressValidator());
app.use(express.static('dist')); // serve files from this folder
app.use(helmet());
app.use(compression());
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});
module.exports.expressServer = app; // expose express server to mocha testing

// API
app.route('/api/event')
  .get((req, res) => {
    // storage for query parameters
    const queryObject = {};
    // Check for presence of parameters
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      // Get entire table record
      knex.select().from('music_events')
        .then((results) => {
          res.json(results);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } else {
      // Process each parameter in query string
      for (const key in req.query) { // eslint-disable-line
        switch (key) {
          case 'event_title':
            queryObject[key] = req.query[key];
            break;
          case 'start_date':
            req.checkBody('start_date', '"start_date" parameter must be in a date format.').isDate(req.query[key]);
            req.getValidationResult().then((result) => {
              if (!result) {
                res.status(400).json({ error: result });
                // TODO break completely out of the for loop
              } else {
                // TODO how to handle date searches?
                // queryObject[key] = req.query[key];
              }
            });
            break;
          case 'end_date':
            req.checkBody('end_date', '"end_date" parameter must be in a date format.').isDate(req.query[key]);
            req.getValidationResult().then((result) => {
              if (!result) {
                res.status(400).json({ error: result });
                // TODO break completely out of the for loop
              } else {
                // TODO how to handle date searches?
                // queryObject[key] = req.query[key];
              }
            });
            break;
          case 'category':
            queryObject[key] = req.query[key];
            break;
          case 'description':
            queryObject[key] = req.query[key];
            break;
          case 'featured_flag':
            req.checkBody('featured_flag', '"featured_flag" parameter must be in boolean format.').isBoolean(req.query[key]);
            req.getValidationResult().then((result) => {
              if (!result) {
                res.status(400).json({ error: result });
                // TODO break completely out of the for loop
              } else {
                queryObject[key] = req.query[key];
              }
            });
            break;
          default:
            res.status(400).json({ error: `Your query string is malformed (${key}). Please refer to API documentation to correct this error.` });
        }
        // Execute query
        knex.select() // return all columns from matching rows
          .from('music_events') // from this table
          .where(queryObject)
          .then((results) => {
            res.json(results);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    }

    // req.checkBody(key, `"${key}" parameter must be a string.`).isAlphanumeric(req.query[key]);
    // req.getValidationResult().then((result) => {
    //   if (!result) {
    //     res.status(400).json({ error: result });
    //     // TODO break completely out of the for loop
    //   } else {
    //     queryObject[key] = mysql.escape(req.query[key]);
    //   }
    // });
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

