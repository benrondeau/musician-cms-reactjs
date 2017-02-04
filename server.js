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
app.use(express.static('dist')); // serve files from this folder
app.use(helmet());
app.use(compression());
app.use(expressValidator());
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log('Node server is running on port', app.get('port'));
});

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
            req.checkQuery('id', '"id" parameter must be numbers only.').isInt(req.query[key]);
            queryObject[key] = req.query[key];
            break;
          case 'event_title':
            req.checkQuery('event_title', '"event_title" parameter must not be empty.').notEmpty(req.query[key]);
            queryObject[key] = req.query[key];
            break;
          case 'category':
            req.checkQuery('category', '"category" parameter must not be empty.').notEmpty(req.query[key]);
            queryObject[key] = req.query[key];
            break;
          case 'featured_flag':
            req.checkQuery('featured_flag', '"feature_flag" parameter must not be empty.').notEmpty(req.query[key]);
            req.checkQuery('featured_flag', '"featured_flag" parameter must be in integer 0 or 1 format.').isInt().isBoolean(req.query[key]);
            queryObject[key] = req.query[key];
            break;
          default:
            // Malformed parameter detected!
            req.checkQuery(key, `"${key}" is not a valid parameter.`).isJSON(req.query[key]);
        }
        // STEP 3: Results of validation
        req.getValidationResult().then((result) => {
          if (!result.isEmpty()) {
            res.status(400).json({ error: result.array() });
          } else {
            // Execute search query
            knex.select()
              .from('music_events')
              .where(queryObject)
              .then((results) => {
                if (results.length === 0) {
                  res.json({ results: 0 });
                } else {
                  res.json(results);
                }
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

app.route('/api/event')
  .post((req, res) => {
  // storage for query parameters
    const queryObject = {
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // STEP 1: Check for required 'id' field
    if (req.query.event_title === undefined) {
      res.status(400).json({ error: 'No "event_title" parameter present. This is required' });
    } else {
    // STEP 2: Add optional each parameter in query string
    for (const key in req.query) { // eslint-disable-line
      switch (key) {
        case 'event_title':
          req.checkQuery('event_title', '"event_title" parameter must not be empty.').notEmpty(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'category':
          req.checkQuery('category', '"category" parameter must not be empty.').notEmpty(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'description':
          req.checkQuery('description', '"description" parameter must not be empty.').notEmpty(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'start_date':
          req.checkQuery('start_date', '"start_date" parameter must not be empty.').notEmpty(req.query[key]);
          req.checkQuery('start_date', '"start_date" parameter must be in ISO8601 date format.').isISO8601(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'end_date':
          req.checkQuery('end_date', '"end_date" parameter must not be empty.').notEmpty(req.query[key]);
          req.checkQuery('end_date', '"end_date" parameter must be in ISO8601 date format.').isISO8601(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'featured_flag':
          req.checkQuery('featured_flag', '"featured_flag" parameter must not be empty.').notEmpty(req.query[key]);
          req.checkQuery('featured_flag', '"featured_flag" parameter must be in integer 0 or 1 format.').isInt().isBoolean(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        default:
          // Malformed parameter detected!
          req.checkQuery(key, `"${key}" is not a valid parameter.`).isJSON(req.query[key]);
      }
      // STEP 3: Results of validation
      req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
          res.status(400).json({ error: result.array() });
        } else {
          // Execute insert query
          knex('music_events')
            .insert(queryObject)
            .then((results) => {
              if (results.length === 0) {
                res.json({ results: 0 });
              } else {
                res.json(results);
              }
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

app.route('/api/event/:id')
  .put((req, res) => {
  // storage for query parameters
    const queryObject = {
      updated_at: new Date().toISOString(),
    };
  // STEP 1: Check for required 'id' field
    if (req.params.id === undefined) {
      res.status(400).json({ error: 'No "id" parameter present. This is required' });
    } else {
    // STEP 2: Add optional each parameter in query string
    for (const key in req.query) { // eslint-disable-line
      switch (key) {
        case 'event_title':
          req.checkQuery('event_title', '"event_title" parameter must not be empty.').notEmpty(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'category':
          req.checkQuery('category', '"category" parameter must not be empty.').notEmpty(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'description':
          req.checkQuery('description', '"description" parameter must not be empty.').notEmpty(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'start_date':
          req.checkQuery('start_date', '"start_date" parameter must not be empty.').notEmpty(req.query[key]);
          req.checkQuery('start_date', '"start_date" parameter must be in ISO8601 date format.').isISO8601(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'end_date':
          req.checkQuery('end_date', '"end_date" parameter must not be empty.').notEmpty(req.query[key]);
          req.checkQuery('end_date', '"end_date" parameter must be in ISO8601 date format.').isISO8601(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        case 'featured_flag':
          req.checkQuery('featured_flag', '"featured_flag" parameter must not be empty.').notEmpty(req.query[key]);
          req.checkQuery('featured_flag', '"featured_flag" parameter must be in integer 0 or 1 format.').isInt().isBoolean(req.query[key]);
          queryObject[key] = req.query[key];
          break;
        default:
          // Malformed parameter detected!
          req.checkQuery(key, `"${key}" is not a valid parameter.`).isJSON(req.query[key]);
      }
      // STEP 3: Results of validation
      req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
          res.status(400).json({ error: result.array() });
        } else {
          // Execute update query
          knex('music_events')
            .where('id', req.params.id)
            .update(queryObject)
            .then((results) => {
              if (results.length === 0) {
                res.json({ results: 0 });
              } else {
                res.json(results);
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json(error);
            });
        }
      });
    }
    }
  })
  .delete((req, res) => {
  // STEP 1: Check for presence of id parameter
    if (req.params.id === undefined) {
      res.status(400).json({ error: 'No "id" parameter present. This is required' });
    } else {
      req.checkParams('id', '"id" parameter must be an integer.').isInt(req.params.id);
      req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
          res.status(400).json({ error: result.array() });
        } else {
          // STEP 2: Delete entry matching id
          knex('music_events')
            .where('id', req.params.id)
            .del()
            .then((results) => {
              if (results.length === 0) {
                res.json({ results: 0 });
              } else {
                res.json(results);
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json(error);
            });
        }
      });
    }
  });
