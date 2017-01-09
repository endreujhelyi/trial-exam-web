'use strict';

var bodyParser = require('body-parser'),
    cors = require('cors'),
    mysql = require('mysql');

var express = require('express'),
    codeLibrary = express(),
    decode = require('./decoder.js');

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
      var allText = [];
      rows.forEach(function(line, index) {
        allText.push(line.text);
      });
      res.status(200).send({all: allText});
  });
});

codeLibrary.post('/decode', function(req, res) {
  if (req.body.shift >= -25 && req.body.shift <= 25) {
    let codedText = decode.decoder(req.body.text, req.body.shift);
    connection.query(
      `INSERT INTO encoded_codes(text, shift)
        VALUES ('${codedText}', ${req.body.shift});`,
      function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send({status: 'ok', text: codedText});
    })
  } else {
    res.status(400).send({status: 'error', error: 'Shift is out of bound'});
  }
});


connection.connect();
codeLibrary.listen(5000, function() {
  console.log("Server is running on port: 5000!");
});
