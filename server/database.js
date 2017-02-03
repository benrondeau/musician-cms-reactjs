const mysql = require('mysql'); // Docs @ https://www.npmjs.com/package/mysql

if (process.env.CLEARDB_DATABASE_URL === undefined) {
  /* eslint global-require: "off", import/no-extraneous-dependencies: "off" */
  require('dotenv').config(); // load .env file into environment in development
}

const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

// MySQL API
module.exports = {

  // Connect to Database
  connect() {
    connection.connect((err) => {
      if (err) {
        console.error(`MySQL error connecting: ${err.stack}`);
        return;
      }
      console.log('Connection to MySQL DB successful!');
    });
  },

  // Disconnect from DB
  disconnect() {
    connection.end((error) => {
      if (error) { console.log(`Error disconnected from DB. Details: ${error}`); return; }
      console.log('Connection to DB successfully closed.');
    });
  },

  // Create a Table
  createNewTable() {
    connection.query('CREATE TABLE IF NOT EXISTS `music_events` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`event_title` text,`start_date` date DEFAULT NULL,`end_date` date DEFAULT NULL,`category` text,`description` text,`featured_flag` tinyint(1) DEFAULT NULL,`created_at` timestamp NULL DEFAULT NULL,`updated_at` timestamp NULL DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;',
      (error) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log('Success creating new database table!');
      });
  },

  // Retrieve entire contents of DB to cache in memory
  getDBcontents() {
    connection.query('SELECT * FROM music_events',
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(`${results.length} event(s) retrieved.`);
        this.allEvents = results;
      });
  },

  readDB(params) {
    // build query
    connection.query(`SELECT * FROM music_events WHERE event_title = ${connection.escape('SXSW')}`,
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(`${results.length} event(s) retrieved.`);
        console.log(results);
        res.json(mysql.readDB());
      });
  },

  // Variable to stored events.
  allEvents: undefined,
};

// GET TIMESTAMP new Date().toISOString()

/* TODO
 ✓ Methods to create:
  - return all events
  - return event by:
    - event title
    - date range
    - category
    - description
    - featured flag
*/

