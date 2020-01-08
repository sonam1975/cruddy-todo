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
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, err => {
    if (err) {
      throw 'error writing counter';
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = function(callback) {
  readCounter(function(err, currentCount) {
    writeCounter(currentCount + 1, function(err, uniqueId) {
      callback(err, uniqueId);
    });
  });
};

// exports.getNextUniqueId = callback => {
//   readCounter(function (err, data) {
//     if (err) {
//       callback(err);
//     } else {
//       data ++; //data = 1
//       data = zeroPaddedNumber(data); //data=00001
//       writeCounter(data, function (err) {
//         if (err) {
//           callback(err);
//         } else {
//           callback(null, data);
//         }
//       });
//     }
//   });
// };

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, "counter.txt");
