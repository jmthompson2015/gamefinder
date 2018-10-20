/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const fs = require("fs");
const rp = require("request-promise");

const FileLoader = {};

FileLoader.loadFile = function loadFile(url) {
  // console.log(`loading file ${url}`);

  return rp(url).catch(err => {
    console.log(err);
  });
};

FileLoader.loadLocalFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

module.exports = FileLoader;
