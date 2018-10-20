/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require("fs");

const FileWriter = {};

FileWriter.writeFile = (outputFile, content, isVerbose = true) => {
  fs.writeFile(outputFile, content, err => {
    if (err) {
      throw err;
    }

    // success case, the file was saved
    if (isVerbose) {
      console.log(`${outputFile} saved`);
    }
  });
};

module.exports = FileWriter;
