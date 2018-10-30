/* eslint new-cap: ["error", { "newIsCap": false }] */
/* eslint no-console: ["error", { allow: ["log", "error"] }] */

const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const USER = ["ghightshoe", "jmthompson", "kmistr"];

const OUTPUT_FILE = "GameUser.json";

const createUrl = username => {
  const baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

  // https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=ghightshoe
  const sourceUrl = `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${username}`;
  const query = `select * from xml where url='${sourceUrl}'`;
  const answer = baseUrl + encodeURIComponent(query);

  return answer;
};

const parseUserGameIds = xmlDocument => {
  const answer = [];

  // This gives the data items.
  const myXPath = "query/results/items/item";
  const resultType = xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xpath.evaluate(myXPath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const idCell = xpath.evaluate("@objectid", thisRow, null, xpath.XPathResult.STRING_TYPE, null);
    const id = parseInt(idCell.stringValue.trim(), 10);
    answer.push(id);

    thisRow = rows.iterateNext();
  }

  return answer;
};

const GameCollectionFetcher = {};

GameCollectionFetcher.fetchData = username =>
  new Promise((resolve, reject) => {
    const receiveData = xmlDocument => {
      const gameIds = parseUserGameIds(xmlDocument);
      gameIds.sort((a, b) => a - b);
      const userId = USER.indexOf(username) + 1;
      resolve({ userId, gameIds });
    };

    const url = createUrl(username);
    FileLoader.loadFile(url).then(data => {
      if (data === undefined) {
        reject(new Error(`Failed to load inputFile: ${url}`));
      }

      const xmlDocument = new dom().parseFromString(data);

      receiveData(xmlDocument);
    });
  });

GameCollectionFetcher.fetchAll = () =>
  new Promise(resolve => {
    let content = {};
    let count = 0;
    const loopFunction = data => {
      content = R.reduce(
        (accum, gameId) => {
          const entry = accum[gameId];
          if (entry === undefined) {
            return R.assoc(gameId, [data.userId], accum);
          }

          const newUsers = R.append(data.userId, entry);
          newUsers.sort();
          return R.assoc(gameId, newUsers, accum);
        },
        content,
        data.gameIds
      );
      count += 1;

      if (count === USER.length) {
        resolve(content);
      }
    };

    for (let i = 0; i < USER.length; i += 1) {
      GameCollectionFetcher.fetchData(USER[i]).then(loopFunction);
    }
  });

const start = Date.now();
GameCollectionFetcher.fetchAll().then(content0 => {
  const content = JSON.stringify(content0, null, "  ");
  FileWriter.writeFile(OUTPUT_FILE, content);
  const end = Date.now();
  console.log(`elapsed: ${end - start} ms`);
});
