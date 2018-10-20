/* eslint no-console: ["error", { allow: ["log"] }] */

const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const GameSummaryFetcher = {};

const OUTPUT_FILE = "GameSummary.json";

const extractCellContent = cellRow => {
  const key0 = "<td";
  const index0 = cellRow.indexOf(key0);
  const key1 = ">";
  const index1 = cellRow.indexOf(key1, index0 + key0.length);
  const content = cellRow.substring(index1 + key1.length).trim();
  const index2 = content.lastIndexOf(key1);

  return index2 >= 0 ? content.substring(index2 + key1.length).trim() : content;
};

const extractLinkHref = anchorRow => {
  const key0 = "<a";
  const index0 = anchorRow.indexOf(key0);
  const key1 = 'href="';
  const index1 = anchorRow.indexOf(key1, index0 + key0.length);
  const index2 = anchorRow.indexOf('"', index1 + key1.length);
  return anchorRow.substring(index1 + key1.length, index2);
};

const reduceFunction1 = (accum, dataRow) => {
  const dataElements = dataRow.trim().split("</td>");

  if (dataElements.length > 0 && dataElements[0] && dataElements[2]) {
    const rankString = extractCellContent(dataElements[0]);
    const rank = parseInt(rankString, 10);
    const url = `https://www.boardgamegeek.com/${extractLinkHref(dataElements[2])}`;
    const index1 = url.lastIndexOf("/");
    const index0 = url.lastIndexOf("/", index1 - 1);
    const gameId = url.substring(index0 + 1, index1);

    return R.append({ rank, gameId, url }, accum);
  }

  return accum;
};

GameSummaryFetcher.fetch = page =>
  new Promise((resolve, reject) => {
    const inputFile = `https://www.boardgamegeek.com/browse/boardgame/page/${page}`;
    FileLoader.loadFile(inputFile).then(data => {
      if (data === undefined) {
        reject(new Error(`Failed to load inputFile: ${inputFile}`));
      }

      const key0 = "id='collectionitems'";
      const index0 = data.indexOf(key0) + key0.length;
      const key1 = "</table>";
      const index1 = data.indexOf(key1, index0);
      const tableBody = data.substring(index0, index1 + key1.length);
      const dataRows = tableBody.split("</tr>");
      dataRows.shift();
      console.log(`dataRows.length = ${dataRows.length}`);

      resolve(R.reduce(reduceFunction1, [], dataRows));
    });
  });

GameSummaryFetcher.fetchAll = maxPages =>
  new Promise(resolve => {
    let content = [];
    let count = 0;
    const loopFunction = data => {
      content = R.concat(content, data);
      count += 1;

      if (count === maxPages) {
        resolve(R.sortBy(R.prop("rank"), content));
      }
    };

    for (let page = 1; page <= maxPages; page += 1) {
      GameSummaryFetcher.fetch(page).then(loopFunction);
    }
  });

const start = Date.now();
const maxPages = 10;
GameSummaryFetcher.fetchAll(maxPages).then(content0 => {
  const content = JSON.stringify(content0, null, "  ");
  FileWriter.writeFile(OUTPUT_FILE, content);
  const end = Date.now();
  console.log(`elapsed: ${end - start} ms`);
});
