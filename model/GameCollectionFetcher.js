import ASelector from "../artifact/Selector.js";

import GameCollectionState from "../state/GameCollectionState.js";

import FetchUtilities from "./FetchUtilities.js";

const createUrl = username =>
  `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${username}`;

const parseUserGameIds = xmlDocument => {
  const answer = [];

  // This gives the data items.
  const xpath = "items/item";
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

const NIC_GAME_IDS = [
  193738, // Great Western Trail
  250458, // Gugong
  252446, // Key Flow
  255692, // New Frontiers
  242302, // Space Base
  229853, // Teotihuacan: City of Gods
  167791, // Terraforming Mars
  247763 // Underwater Cities
];

const GameCollectionFetcher = {};

GameCollectionFetcher.fetchData = username =>
  new Promise(resolve => {
    if (username === "nic") {
      const gameIds = NIC_GAME_IDS;
      gameIds.sort((a, b) => a - b);
      const user = ASelector.userByName(username);
      resolve(GameCollectionState.create({ userId: user.id, gameIds }));
    } else {
      const receiveData = xmlDocument => {
        const gameIds = parseUserGameIds(xmlDocument);
        gameIds.sort((a, b) => a - b);
        const user = ASelector.userByName(username);
        resolve(GameCollectionState.create({ userId: user.id, gameIds }));
      };

      const url = createUrl(username);
      const options = {};
      FetchUtilities.fetchRetryXml(url, options, 5).then(receiveData);
    }
  });

export default GameCollectionFetcher;
