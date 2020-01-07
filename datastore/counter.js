const fs = require("fs");
const path = require("path");
const sprintf = require("sprintf-js").sprintf;

var counter = 0;
const zeroPaddedNumber = num => {
  return sprintf("%05d", num);
};

const readCounter = callback => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(err);
    } else {
      callback(null, fileData);
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, err => {
    if (err) {
      throw "error writing counter";
    } else {
      callback(null, Number(counterString));
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = callback => {
  readCounter((err, id) => {
    if (err) {
      throw "error";
    } else {
      writeCounter(counter++, (err, id) => {});
    }
  });
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, "counter.txt");
