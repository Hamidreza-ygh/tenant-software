require("dotenv").config();
const cors = require("cors");
var ConnectoToDatabase = require('./app/config/connection');
var express = require('express');
// var bodyParser = require('body-parser');

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
// app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://tenantodo.life"); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-User'); // Allow specific headers
//   next();
// });
// CORS configuration
const corsOptions = {
  origin: 'http://tenantodo.life', // Replace with your allowed origin
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'], // Ensure OPTIONS is included
  allowedHeaders: ['Content-Type', 'Authorization'], // Include the Authorization header
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // Include if you need to support credentials
};

// Use the CORS middleware with the defined options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions)); // Allow preflights to be handled by CORS middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

connection.connect();
// ConnectoToDatabase.connect();
// ConnectoToDatabase.init();
routes.configure(app, connection);

var server = app.listen(8000, function(){
  console.log('Server listening on port ' + server.address().port);
});
