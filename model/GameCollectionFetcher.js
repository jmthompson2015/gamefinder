/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import GameCollectionState from "../state/GameCollectionState.js";

const createUrl = username => {
  const baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

  // https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=ghightshoe
  const sourceUrl = `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${username}`;
  const query = `select * from xml where url='${sourceUrl}'`;
  const answer = baseUrl + encodeURIComponent(query);
  console.log(`url = ${answer}`);

  return answer;
};

const parseUserCollectionIds = xmlDocument => {
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
  new Promise((resolve, reject) => {
    const receiveData = xmlDocument => {
      const collectionIds = parseUserCollectionIds(xmlDocument);
      collectionIds.sort((a, b) => a - b);
      resolve(GameCollectionState.create({ username, collectionIds }));
    };

    const url = createUrl(username);
    $.ajax(url)
      .done(receiveData)
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error(errorThrown);
        reject(errorThrown);
      });
  });

export default GameCollectionFetcher;
