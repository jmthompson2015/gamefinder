/* eslint no-console: ["error", { allow: ["log", "error"] }] */

const xpath = require("xpath");
const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const USER = ["ghightshoe", "jmthompson", "kmistr"];

const OUTPUT_FILE1 = "UserGame.json";
const OUTPUT_FILE2 = "GameUser.json";

const createUrl = username =>
  `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${username}`;

const parseUserGameIds = xmlDocument => {
  const answer = [];

  // This gives the data items.
  const myXPath = "items/item";
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
  new Promise(resolve => {
    const receiveData = xmlDocument => {
      const gameIds = parseUserGameIds(xmlDocument);
      gameIds.sort((a, b) => a - b);
      const userId = USER.indexOf(username) + 1;
      resolve({ userId, gameIds });
    };

    const url = createUrl(username);
    const options = {};
    FileLoader.fetchRetryXml(url, options, 3).then(receiveData);
  });

GameCollectionFetcher.fetchAll = () =>
  new Promise(resolve => {
    let content1 = {};
    let content2 = {};
    let count = 0;
    const loopFunction = data => {
      content1 = R.assoc(data.userId, data, content1);
      content2 = R.reduce(
        (accum, gameId) => {
          const entry = accum[gameId];
          if (entry === undefined) {
            return R.assoc(gameId, [data.userId], accum);
          }

          const newUsers = R.append(data.userId, entry);
          newUsers.sort();
          return R.assoc(gameId, newUsers, accum);
        },
        content2,
        data.gameIds
      );
      count += 1;

      if (count === USER.length) {
        resolve([content1, content2]);
      }
    };

    for (let i = 0; i < USER.length; i += 1) {
      GameCollectionFetcher.fetchData(USER[i]).then(loopFunction);
    }
  });

const start = Date.now();
GameCollectionFetcher.fetchAll().then(contents => {
  const content1 = JSON.stringify(contents[0], null, "  ");
  const content2 = JSON.stringify(contents[1], null, "  ");
  FileWriter.writeFile(OUTPUT_FILE1, content1);
  FileWriter.writeFile(OUTPUT_FILE2, content2);
  const end = Date.now();
  console.log(`elapsed: ${end - start} ms`);
});
