/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import GameSummaryState from "../state/GameSummaryState.js";

const createUrl = page => {
  const baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

  // https://www.boardgamegeek.com/browse/boardgame
  // https://www.boardgamegeek.com/browse/boardgame/page/2
  const sourceUrl = `https://www.boardgamegeek.com/browse/boardgame/page/${page}`;

  const query = `select * from htmlstring where url="${sourceUrl}"`;
  const answer = `${baseUrl +
    encodeURIComponent(query)}&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
  // console.log(`url = ${answer}`);

  return answer;
};

const parseGameSummary = (xmlDocument, xmlFragment) => {
  // This gives the data cells (td).
  const xpath = "td";
  const resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  const cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);

  const boardGameRank = cells.snapshotItem(0).textContent.trim();
  let title = cells.snapshotItem(2).textContent.trim();
  title = title.replace(/\n/g, "");
  while (title.indexOf("  ") >= 0) {
    title = title.replace(/ {2}/g, " ");
  }

  const idCell = xmlDocument.evaluate(
    "a/@href",
    cells.snapshotItem(1),
    null,
    XPathResult.STRING_TYPE,
    null
  );
  let id = idCell.stringValue.trim();
  id = id.replace("/boardgame/", "");
  id = id.replace("/boardgameexpansion/", "");
  const index = id.indexOf("/");
  id = id.substring(0, index);

  const geekRatingDisplay = cells.snapshotItem(3).textContent.trim();
  const averageRatingDisplay = cells.snapshotItem(4).textContent.trim();
  const numVoters = cells.snapshotItem(5).textContent.trim();

  return GameSummaryState.create({
    id: parseInt(id, 10),
    title,
    boardGameRank: parseInt(boardGameRank, 10),
    geekRating: parseFloat(geekRatingDisplay),
    geekRatingDisplay,
    averageRating: parseFloat(averageRatingDisplay),
    averageRatingDisplay,
    numVoters: parseInt(numVoters, 10)
  });
};

const parseGameSummaries = xmlDocument => {
  const answer = [];

  // This gives the data rows (tr).
  const xpath = "//tr[@id='row_']";
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const gameSummary = parseGameSummary(xmlDocument, thisRow);
    answer.push(gameSummary);

    thisRow = rows.iterateNext();
  }

  return answer;
};

const GameSummaryFetcher = {};

GameSummaryFetcher.fetchData = page =>
  new Promise((resolve, reject) => {
    const receiveData = xmlDocument0 => {
      const xmlDocument = xmlDocument0;
      let content = xmlDocument.children[0].children[0].children[0];
      if (content) {
        content = content.innerHTML;
        content = content.replace(/&lt;/g, "<");
        content = content.replace(/&gt;/g, ">");

        xmlDocument.children[0].children[0].children[0].innerHTML = content;
        const gameSummaries = parseGameSummaries(xmlDocument);
        resolve(gameSummaries);
      } else {
        reject(new Error(`XML document content is undefined for page: ${page}`));
      }
    };

    const url = createUrl(page);
    $.ajax(url)
      .done(receiveData)
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error(errorThrown);
        reject(errorThrown);
      });
  });

export default GameSummaryFetcher;
