import ASelector from "../artifact/Selector.js";

import GameCollectionState from "../state/GameCollectionState.js";

import FetchUtilities from "./FetchUtilities.js";

const createUrl = (username, isWished) => {
  const base = "https://www.boardgamegeek.com/xmlapi2/collection?";
  const parameter = isWished ? "wishlist=1&" : "own=1&";

  return `${base}${parameter}username=${username}`;
};

const parseUserGameIds = (xmlDocument) => {
  const answer = [];

  // This gives the data items.
  const xpath = "items/item";
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const idCell = xmlDocument.evaluate(
      "@objectid",
      thisRow,
      null,
      XPathResult.STRING_TYPE,
      null
    );
    const id = parseInt(idCell.stringValue.trim(), 10);
    answer.push(id);

    thisRow = rows.iterateNext();
  }

  return answer;
};

const GREG_GAME_IDS = [
  317985, // Beyond the Sun
  224517, // Brass: Birmingham
  290236, // Canvas
  293014, // Nidavellir
  146508, // T.I.M.E Stories
  266192, // Wingspan
];
const KIRK_GAME_IDS = [
  283355, // Dune (2019)
  242302, // Space Base (2018)
];
// const NIC_GAME_IDS = [
//   222514, // Batman: Gotham City Chronicles
//   124361, // Concordia
//   269595, // Copenhagen
//   193738, // Great Western Trail
//   250458, // Gugong
//   252446, // Key Flow
//   255692, // New Frontiers
//   242302, // Space Base
//   229853, // Teotihuacan: City of Gods
//   167791, // Terraforming Mars
//   247763, // Underwater Cities
// ];

const GameCollectionFetcher = {};

GameCollectionFetcher.fetchData = (username, isWished = false) =>
  new Promise((resolve) => {
    // if (username === "nic") {
    //   const user = ASelector.userByName(username);
    //   if (isWished) {
    //     resolve(GameCollectionState.create({ userId: user.id, gameIds: [] }));
    //   } else {
    //     const gameIds = NIC_GAME_IDS;
    //     gameIds.sort((a, b) => a - b);
    //     resolve(GameCollectionState.create({ userId: user.id, gameIds }));
    //   }
    // } else {
      const receiveData = (xmlDocument) => {
        const gameIds0 = parseUserGameIds(xmlDocument);
        let gameIds = gameIds0;

        if (username === "ghightshoe") {
          gameIds = R.uniq(R.concat(gameIds0, GREG_GAME_IDS));
        } else if (username === "kmistr") {
          gameIds = R.uniq(R.concat(gameIds0, KIRK_GAME_IDS));
        }

        gameIds.sort((a, b) => a - b);
        const user = ASelector.userByName(username);
        resolve(GameCollectionState.create({ userId: user.id, gameIds }));
      };

      const url = createUrl(username, isWished);
      const options = {};
      FetchUtilities.fetchRetryXml(url, options, 5).then(receiveData);
    // }
  });

export default GameCollectionFetcher;
