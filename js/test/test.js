const decode = require('../server/decoder.js');
const test = require('tape');

test('Check if output is valid', function(t) {
  t.equal(decode.decoder('hello', 2), 'jgnnq');
  t.end();
})

test('Test spaces between words', function(t) {
  t.equal(decode.decoder('hello hello hello', 2), 'jgnnq jgnnq jgnnq');
  t.end();
})

test('Test unique characters', function(t) {
  t.equal(decode.decoder('hello!.<>/...{}hello', 2), 'jgnnq!.<>/...{}jgnnq');
  t.end();
})
