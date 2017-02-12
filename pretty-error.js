const parseError = require('./parse-error');
const chalk = require('chalk');
const cardinal = require('cardinal');

/*
{ file:
   { path: '/Users/mikaelbrevik/Documents/Sites/exp/livestream/stream2/demo-node/test.js',
     line: '2',
     filename: 'test.js' },
  stacktrace:
   { error:
      { type: 'SyntaxError',
        message: 'Identifier \'foo\' has already been declared' },
     trace:
  visual:
   { line: 'let foo = \'hello2\';',
     indicator: '          ^^^^^^^^' } }
*/
module.exports = function prettyError(errorString) {
  var {
    file,
    stacktrace,
    visual
  } = parseError(errorString);

  console.error(
    chalk.bgRed(`› ${stacktrace.error.type}: `) +
      chalk.bgBlue(` ${file.filename} (line ${file.line}) `)
  );
  console.error(chalk.dim('  ' + stacktrace.error.message));

  console.error(`\n${cardinal.highlight(visual.line)}`);
  console.error(chalk.red(visual.indicator));
};
