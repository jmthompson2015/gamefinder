/* eslint new-cap: ["error", { "newIsCap": false }] */
/* eslint no-console: ["error", { allow: ["log", "error"] }] */

const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const GameDetailFetcher = {};

const OUTPUT_FILE = "GameDetail.json";

function createUrl(gameIds) {
  const baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

  // https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=12333,120677
  const idsString = gameIds.reduce((previousValue, id, i) => {
    let answer = previousValue + id;

    if (i < gameIds.length - 1) {
      answer += ",";
    }

    return answer;
  }, "");

  const sourceUrl = `https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=${idsString}`;
  const query = `select * from xml where url='${sourceUrl}'`;

  return baseUrl + encodeURIComponent(query);
}

const loadGameIds = () =>
  new Promise((resolve, reject) => {
    const inputFile1 = "GameUser.json";
    FileLoader.loadLocalFile(inputFile1).then(data1 => {
      if (data1 === undefined) {
        reject(new Error(`Failed to load url: ${inputFile1}`));
      }

      const gameToUser = JSON.parse(data1);
      const gameIds1 = Object.keys(gameToUser);

      const inputFile2 = "GameSummary.json";
      FileLoader.loadLocalFile(inputFile2).then(data2 => {
        if (data2 === undefined) {
          reject(new Error(`Failed to load url: ${inputFile2}`));
        }

        const summaries = JSON.parse(data2);
        const gameIds2 = R.map(summary => summary.gameId, summaries);

        const gameIds = R.uniq(R.concat(gameIds1, gameIds2));
        gameIds.sort();
        resolve(gameIds);
      });
    });
  });

function parseBestWithPlayers(xmlDocument, xmlFragment) {
  let answer;

  const myXPath = "poll[@name='suggested_numplayers']/results";
  const resultType = xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xpath.evaluate(myXPath, xmlFragment, null, resultType, null);
  let thisRow = rows.iterateNext();
  let maxNumVotes;

  while (thisRow) {
    const numPlayersCell = xpath.evaluate(
      "@numplayers",
      thisRow,
      null,
      xpath.XPathResult.STRING_TYPE,
      null
    );
    const numPlayers = numPlayersCell.stringValue.trim();
    const numVotesCell = xpath.evaluate(
      "result[@value='Best']/@numvotes",
      thisRow,
      null,
      xpath.XPathResult.STRING_TYPE,
      null
    );
    const numVotes = parseInt(numVotesCell.stringValue.trim(), 10);
    // console.log(`numPlayers = ${numPlayers} numVotes = ${numVotes}`);

    if (!maxNumVotes || numVotes > maxNumVotes) {
      answer = numPlayers;
      maxNumVotes = numVotes;
    }

    thisRow = rows.iterateNext();
  }

  // console.log(`answer = ${answer} maxNumVotes = ${maxNumVotes}`);

  return answer;
}

function parseEntities(xmlDocument, xmlFragment, type) {
  const answer = [];

  const myXPath = `link[@type='${type}']`;
  const resultType = xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xpath.evaluate(myXPath, xmlFragment, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const idCell = xpath.evaluate("@id", thisRow, null, xpath.XPathResult.STRING_TYPE, null);
    const id = idCell.stringValue.trim();
    const nameCell = xpath.evaluate("@value", thisRow, null, xpath.XPathResult.STRING_TYPE, null);
    const name = nameCell.stringValue.trim();
    const entity = {
      type,
      id: parseInt(id, 10),
      name,
      count: 1
    };
    answer.push(entity);

    thisRow = rows.iterateNext();
  }

  return answer;
}

function parseGameDetail(xmlDocument, xmlFragment) {
  const idCell = xpath.evaluate("@id", xmlFragment, null, xpath.XPathResult.STRING_TYPE, null);
  const id = idCell.stringValue.trim();

  const boardGameRankCell = xpath.evaluate(
    "statistics/ratings/ranks/rank[@friendlyname='Board Game Rank']/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const boardGameRank = boardGameRankCell.stringValue.trim();

  const titleCell = xpath.evaluate(
    "name[@type='primary']/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const title = titleCell.stringValue.trim();

  const yearPublishedCell = xpath.evaluate(
    "yearpublished/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const yearPublished = yearPublishedCell.stringValue.trim();

  const geekRatingCell = xpath.evaluate(
    "statistics/ratings/ranks/rank[@friendlyname='Board Game Rank']/@bayesaverage",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const geekRating = geekRatingCell.stringValue.trim();

  const minPlayersCell = xpath.evaluate(
    "minplayers/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const minPlayers = minPlayersCell.stringValue.trim();

  const maxPlayersCell = xpath.evaluate(
    "maxplayers/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const maxPlayers = maxPlayersCell.stringValue.trim();

  const bestWithPlayers = parseBestWithPlayers(xmlDocument, xmlFragment);

  const minPlayTimeCell = xpath.evaluate(
    "minplaytime/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const minPlayTime = minPlayTimeCell.stringValue.trim();

  const maxPlayTimeCell = xpath.evaluate(
    "maxplaytime/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const maxPlayTime = maxPlayTimeCell.stringValue.trim();

  const averageWeightCell = xpath.evaluate(
    "statistics/ratings/averageweight/@value",
    xmlFragment,
    null,
    xpath.XPathResult.STRING_TYPE,
    null
  );
  const averageWeight = averageWeightCell.stringValue.trim();

  const categories = parseEntities(xmlDocument, xmlFragment, "boardgamecategory");
  const designers = parseEntities(xmlDocument, xmlFragment, "boardgamedesigner");
  const mechanics = parseEntities(xmlDocument, xmlFragment, "boardgamemechanic");

  return {
    id: parseInt(id, 10),
    boardGameRank: parseInt(boardGameRank, 10),
    title,
    designers,
    yearPublished: parseInt(yearPublished, 10),
    geekRating: Number(geekRating),
    minPlayers: parseInt(minPlayers, 10),
    maxPlayers: parseInt(maxPlayers, 10),
    bestWithPlayers: parseInt(bestWithPlayers, 10),
    minPlayTime: parseInt(minPlayTime, 10),
    maxPlayTime: parseInt(maxPlayTime, 10),
    averageWeight: Number(averageWeight),
    categories,
    mechanics
  };
}

function parseGameDetails(xmlDocument) {
  let answer = {};

  // This gives the data items.
  const myXPath = "query/results/items/item";
  const resultType = xpath.XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xpath.evaluate(myXPath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const gameDetail = parseGameDetail(xmlDocument, thisRow);
    answer = R.assoc(gameDetail.id, gameDetail, answer);

    thisRow = rows.iterateNext();
  }

  return answer;
}

GameDetailFetcher.fetchAll = gameIds =>
  new Promise((resolve, reject) => {
    const url = createUrl(gameIds);
    FileLoader.loadFile(url).then(data => {
      if (data === undefined) {
        reject(new Error(`Failed to load url: ${url}`));
      }

      const xmlDocument = new dom().parseFromString(data);

      resolve(parseGameDetails(xmlDocument));
    });
  });

const start = Date.now();
loadGameIds().then(gameIds => {
  const gameIdSets = R.splitEvery(20, gameIds);
  const setCount = gameIdSets.length;
  let gameDetails = {};
  let count = 0;
  const forEachFunction = gameIdSet => {
    GameDetailFetcher.fetchAll(gameIdSet).then(myGameDetails => {
      gameDetails = R.merge(gameDetails, myGameDetails);
      count += 1;

      if (count === setCount) {
        const content = JSON.stringify(gameDetails, null, "  ");
        FileWriter.writeFile(OUTPUT_FILE, content);
        const end = Date.now();
        console.log(`elapsed: ${end - start} ms`);
      }
    });
  };

  R.forEach(forEachFunction, gameIdSets);
});
