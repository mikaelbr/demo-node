#!/usr/bin/env node
const prettyPrintError = require('./pretty-error');
const fork = require('child_process').fork;

const file = process.argv[2];
const args = process.argv.slice(3);

const cp = fork(file, args, {
  silent: true
});

cp.stdout.pipe(process.stdout);

var hasError = false;
cp.stdout.on('data', function() {
  hasError = true;
});

cp.stderr.on('data', function(data) {
  var dataString = data.toString('utf-8');
  if (hasError) {
    console.error('\n');
  }
  prettyPrintError(dataString);
});
