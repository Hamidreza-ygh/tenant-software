var mysql = require('mysql2');
var fs = require('fs');

function Connection() {
  // this.pool = null;
  // this.connection = mysql.createConnection("mysql://avnadmin:AVNS_UzVmkirWWB6rs-e9W4N@tenant-1-exoscale-281607c5-270f-47aa-b92e-042fb1218654.f.aivencloud.com:21699/defaultdb?ssl-mode=REQUIRED");
  this.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // ssl: {
    //   ca: fs.readFileSync(__dirname + '/certs/ca.pem'),
    // }
  });

  this.connect = function() {
    return new Promise((resolve, reject) => {
      this.connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          reject(err);
        } else {
          console.log('connected as id ');
          resolve();
        }
      });
    });
  };
  
  this.init = function() {
    // Import schema.sql file into the database
    var schema = fs.readFileSync(__dirname + '/db/schema.sql', 'utf8');
    this.connect().then(() => {
      this.connection.query(schema, (err) => { // Use arrow function to preserve 'this' context
        if (err) {
          console.error('error importing schema: ' + err.stack);
          return;
        }
        console.log('schema imported successfully');
      });
    }).catch((err) => {
      console.error('error connecting: ' + err.stack);
    });
  };
  // this.connect = function() {
  //   this.connection.connect(function(err) {
  //     if (err) {
  //       console.error('error connecting: ' + err.stack);
  //       return;
  //     }
  //     console.log('connected as id ');
  //   });
  // };

  // this.init = function() {
  //   // Import schema.sql file into the database
  //   var schema = fs.readFileSync(__dirname + '/db/schema.sql', 'utf8');
  //   this.connection.query(schema, (err) => { // Use arrow function to preserve 'this' context
  //     if (err) {
  //       console.error('error importing schema: ' + err.stack);
  //       return;
  //     }
  //     console.log('schema imported successfully');
  //   });
  // };
}

module.exports = new Connection();
