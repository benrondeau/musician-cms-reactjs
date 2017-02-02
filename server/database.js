const mysql = require('mysql');
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
      console.log('Connection to MySQL DB successful');
    });
  },
};
