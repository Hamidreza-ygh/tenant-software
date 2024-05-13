require("dotenv").config();
var ConnectoToDatabase = require('./app/config/connection');
var express = require('express');
var bodyParser = require('body-parser');

// var ConnectoToDatabase = require('./app/config/connection');

var connection = new ConnectoToDatabase({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // ssl: {
  //   ca: fs.readFileSync(__dirname + '/certs/ca.pem'),
  // }
});

var routes = require('./app/controllers/routes');
// const { connect } = require("./app/config/connection");

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

connection.connect();
// ConnectoToDatabase.connect();
// ConnectoToDatabase.init();
routes.configure(app);

var server = app.listen(8000, function(){
  console.log('Server listening on port ' + server.address().port);
});
