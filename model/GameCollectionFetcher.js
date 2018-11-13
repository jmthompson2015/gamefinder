/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import ASelector from "../artifact/Selector.js";

import GameCollectionState from "../state/GameCollectionState.js";

import FetchUtilities from "./FetchUtilities.js";

const createUrl = username => {
  const baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

  // https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=ghightshoe
  const sourceUrl = `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${username}`;
  const query = `select * from xml where url='${sourceUrl}'`;
  const answer = baseUrl + encodeURIComponent(query);
  // console.log(`url = ${answer}`);

  return answer;
};

const parseUserGameIds = xmlDocument => {
  const answer = [];

  // This gives the data items.
  const xpath = "query/results/items/item";
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const idCell = xmlDocument.evaluate("@objectid", thisRow, null, XPathResult.STRING_TYPE, null);
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
      const user = ASelector.userByName(username);
      resolve(GameCollectionState.create({ userId: user.id, gameIds }));
    };

    const url = createUrl(username);
    const options = {};
    FetchUtilities.fetchRetryXml(url, options, 3).then(receiveData);
  });

export default GameCollectionFetcher;
