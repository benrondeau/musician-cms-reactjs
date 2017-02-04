const express = require('express');
const helmet = require('helmet'); // set security-related HTTP headers
const compression = require('compression'); // gzip responses, speed things up
const expressValidator = require('express-validator');
const mysql = require('mysql'); // eslint-disable-line

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
app.get('/api/event', (req, res) => {
  // storage for query parameters
  const queryObject = {};
  // STEP 1: Check for presence of parameters
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
      // STEP 2: Process each parameter in query string
      for (const key in req.query) { // eslint-disable-line
        switch (key) {
          case 'id':
            req.checkBody('id', '"id" parameter must be numbers only.').isInteger(req.query[key]);
            queryObject[key] = req.query[key];
            break;
          case 'event_title':
            queryObject[key] = req.query[key];
            break;
          case 'category':
            queryObject[key] = req.query[key];
            break;
          case 'description':
            queryObject[key] = req.query[key];
            break;
          case 'featured_flag':
            req.checkBody('featured_flag', '"featured_flag" parameter must be in boolean format.').isBoolean(req.query[key]);
            queryObject[key] = req.query[key];
            break;
          default:
            // Malformed parameter detected!
            req.checkBody(queryObject[key], `"${queryObject[key]}" is not a valid parameter.`).isBoolean(null);// This will fail.
        }
        // STEP 3: Results of validation
        req.getValidationResult().then((result) => {
          if (!result) {
            res.status(400).json({ error: result });
          } else {
            // Execute search query
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
        });
      }
  }
});

app.post('/api/event/create', (req, res) => {
    // storage for query parameters
    // TODO verify all these column names
  const queryObject = {
    event_title: '',
    category: null,
    description: null,
    featured_flag: false,
    start_date: null,
    end_date: null,
    created_at: '', // TODO insert proper timestamp
    updated_at: '', // TODO insert proper timestamp
  };
    // Execute query
    for (const key in req.query) { // eslint-disable-line
      switch (key) {
        case 'event_title':
          queryObject[key] = req.query[key];
          break;
        case 'category':
          queryObject[key] = req.query[key];
          break;
        case 'description':
          queryObject[key] = req.query[key];
          break;
        case 'start_date':
          queryObject[key] = req.query[key];
          break;
        case 'end_date':
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
          res.status(400).json({ error: 'Your query string is malformed. Please refer to API documentation to correct this error.' });
      }
      // Execute query
      knex('music_events')
        .insert(queryObject)
        .then((results) => {
          res.json(results);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    }
});

app.post('/api/event/update');
app.post('/api/event/delete');
