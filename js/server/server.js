'use strict';

var bodyParser = require('body-parser'),
    cors = require('cors'),
    mysql = require('mysql');

var express = require('express'),
    codeLibrary = express();
codeLibrary.use(bodyParser.json());
codeLibrary.use(cors());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'szomoruszamuraj',
  database: 'codeLibrary'
});



// REQUESTS TO LIBRARY
codeLibrary.get('/decode/all', function(req, res) {
  connection.query(
    `SELECT text FROM encoded_codes;`,
    function(err, rows, fields) {
  		if (err) throw err;
  		res.send(rows);
  });
});

codeLibrary.post('/decode', function(req, res) {
  connection.query(
    `INSERT INTO encoded_codes(text)
    VALUES ${req.body.text};`,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
  });
});


connection.connect();
codeLibrary.listen(3000, function() {
  console.log("Server is running on port: 3000!");
});
