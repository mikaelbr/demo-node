const { basename } = require('path');

module.exports = function parseError(errorString) {
  var lines = splitError(errorString);
  var file = getFileInfo(lines);
  var visual = getVisualInfo(lines);
  var stacktrace = getStackTraceInfo(lines);

  return {
    file,
    visual,
    stacktrace
  };
};

function getStackTraceInfo(lines) {
  var [errorMessage, ...stacktrace] = lines
    .slice(3)
    .filter(item => item.trim() !== '');

  stacktrace = stacktrace.map(t => t.trim());
  var match = errorMessage.match(/([\w]+)\:(.+)/);
  if (!match) {
    return {
      error: {
        type: 'Not found',
        message: ''
      },
      trace: stacktrace
    };
  }

  var [, type, message] = match;

  return {
    error: {
      type,
      message: message.trim()
    },
    trace: stacktrace
  };
}

function getFileInfo(lines) {
  var line = lines[0];
  var match = line.match(/([^\:]+)\:(\d+)/);
  if (!match) {
    return {
      path: '',
      line: -1,
      filename: ''
    };
  }
  var [, filePath, line] = match;
  return {
    path: filePath,
    line,
    filename: basename(filePath)
  };
}

function getVisualInfo(lines) {
  return {
    line: lines[1],
    indicator: lines[2]
  };
}

function splitError(str) {
  return str.split('\n');
}
