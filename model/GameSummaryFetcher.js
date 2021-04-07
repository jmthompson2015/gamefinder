import GameSummaryState from "../state/GameSummaryState.js";

import FetchUtilities from "./FetchUtilities.js";

const createUrl = (page) =>
  `https://www.boardgamegeek.com/browse/boardgame/page/${page}`;

const parseBetween = (htmlFragment, startKey, endKey) => {
  const index0 = htmlFragment.indexOf(startKey);
  const index1 = htmlFragment.lastIndexOf(endKey);

  return htmlFragment.substring(index0 + startKey.length, index1).trim();
};

const parseElement = (cell, tag) => {
  const key0 = `<${tag}`;
  const index0 = cell.indexOf(key0);
  const key1 = `</${tag}>`;
  const index1 = cell.indexOf(key1, index0 + key0.length);
  const element = cell.substring(index0, index1 + key1.length);

  return parseBetween(element, ">", key1);
};

const parseId = (cell) => {
  const key0 = "boardgame/";
  const index0 = cell.indexOf(key0);
  const key1 = "/";
  const index1 = cell.indexOf(key1, index0 + key0.length);

  return cell.substring(index0 + key0.length, index1);
};

const parseImageUrl = (cell) => {
  const key0 = 'src="';
  const index0 = cell.indexOf(key0);
  const key1 = '"';
  const index1 = cell.indexOf(key1, index0 + key0.length);

  return index1 > index0
    ? cell.substring(index0 + key0.length, index1)
    : undefined;
};

const parseGameSummary = (htmlDocument, htmlFragment) => {
  const cells = htmlFragment.split("<td");
  const boardGameRank = parseBetween(cells[1], "</a>", "</td>");
  const imageUrl = parseImageUrl(cells[2]);

  const title = parseElement(cells[3], "a");
  const id = parseId(cells[3]);
  const year = parseElement(cells[3], "span");

  const geekRatingDisplay = parseElement(`<td ${cells[4]}`, "td");

  const averageRatingDisplay = parseElement(`<td ${cells[5]}`, "td");

  const numVoters = parseElement(`<td ${cells[6]}`, "td");

  return GameSummaryState.create({
    id: parseInt(id, 10),
    imageUrl,
    title: `${title} ${year}`,
    boardGameRank: parseInt(boardGameRank, 10),
    geekRating: parseFloat(geekRatingDisplay),
    geekRatingDisplay,
    averageRating: parseFloat(averageRatingDisplay),
    averageRatingDisplay,
    numVoters: parseInt(numVoters, 10),
  });
};

const parseGameSummaries = (htmlDocument) => {
  const answer = [];

  // This gives the data rows (tr).
  const key = "<tr id='row_";
  const rows = htmlDocument.split(key);
  // Ignore first row.
  rows.shift();
  const lastRow0 = rows[rows.length - 1];
  const lastKey = "</tr>";
  const lastRow = lastRow0.substring(
    0,
    lastRow0.indexOf(lastKey) + lastKey.length
  );
  rows[rows.length - 1] = lastRow;
  rows.forEach((thisRow) => {
    const gameSummary = parseGameSummary(htmlDocument, thisRow.trim());
    answer.push(gameSummary);
  });

  return answer;
};

const GameSummaryFetcher = {};

GameSummaryFetcher.fetchData = (page) =>
  new Promise((resolve, reject) => {
    const receiveData = (htmlDocument) => {
      if (htmlDocument) {
        const gameSummaries = parseGameSummaries(htmlDocument);
        resolve({ page, gameSummaries });
      } else {
        reject(
          new Error(`HTML document content is undefined for page: ${page}`)
        );
      }
    };

    const url = createUrl(page);
    const options = {};
    FetchUtilities.fetchRetry(url, options, 5)
      .then((response) => response.text())
      .then(receiveData);
  });

export default GameSummaryFetcher;
