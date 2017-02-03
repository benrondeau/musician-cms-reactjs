const mysql = require('mysql'); // Docs @ https://www.npmjs.com/package/mysql
const env = require('dotenv');

if (process.env.CLEARDB_DATABASE_URL === undefined) {
  env.config(); // load .env file into environment in development
}

const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

// MySQL API
module.exports = {
  connect() {
    connection.connect((err) => {
      if (err) {
        console.error(`MySQL error connecting: ${err.stack}`);
        return;
      }
      console.log('Connection to MySQL DB successful!');
    });
  },
  createNewTable() {
    connection.query('CREATE TABLE `musician1` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`event_title` text,`start_date` date DEFAULT NULL,`end_date` date DEFAULT NULL,`category` text,`description` text,`featured_flag` tinyint(1) DEFAULT NULL,`created_at` timestamp NULL DEFAULT NULL,`updated_at` timestamp NULL DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;',
      (error) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log('Success creating new database table!');
      });
  },
};
