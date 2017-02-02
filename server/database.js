const mysql = require('mysql');
require('dotenv').config(); // read local environment variables in development

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
