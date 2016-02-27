'use strict';

var
  assert = require('chai').assert,
  spec   = require('api-first-spec'),
  localhost = require('./localhost');

function success(){
  console.log("200 OK");
  return "200 OK";
}

function badRequest(data, res) {
  return res.statusCode === 400;
}

function notFound(){
  console.log("404 NotFound");
  return "404 NotFound";
}

module.exports = {
  success: success,
  badRquest: badRquest,
  notFound: notFound
}