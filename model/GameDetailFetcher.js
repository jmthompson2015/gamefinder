/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import GameDetail from "../artifact/GameDetail.js";

import GameDetailState from "../state/GameDetailState.js";

const createUrl = gameIds => {
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
  const answer = baseUrl + encodeURIComponent(query);
  console.log(`url = ${answer}`);

  return answer;
};

const parseBestWithPlayers = (xmlDocument, xmlFragment) => {
  let answer;

  const xpath = "poll[@name='suggested_numplayers']/results";
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
  let thisRow = rows.iterateNext();
  let maxNumVotes;

  while (thisRow) {
    const numPlayersCell = xmlDocument.evaluate(
      "@numplayers",
      thisRow,
      null,
      XPathResult.STRING_TYPE,
      null
    );
    const numPlayers = numPlayersCell.stringValue.trim();
    const numVotesCell = xmlDocument.evaluate(
      "result[@value='Best']/@numvotes",
      thisRow,
      null,
      XPathResult.STRING_TYPE,
      null
    );
    const numVotes = parseInt(numVotesCell.stringValue.trim(), 10);

    if (!maxNumVotes || numVotes > maxNumVotes) {
      answer = numPlayers;
      maxNumVotes = numVotes;
    }

    thisRow = rows.iterateNext();
  }

  return answer;
};

const parseEntities = (xmlDocument, xmlFragment, type) => {
  const answer = [];

  const xpath = `link[@type='${type}']`;
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const idCell = xmlDocument.evaluate("@id", thisRow, null, XPathResult.STRING_TYPE, null);
    const id = idCell.stringValue.trim();
    const nameCell = xmlDocument.evaluate("@value", thisRow, null, XPathResult.STRING_TYPE, null);
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
};

const parseGameDetail = (xmlDocument, xmlFragment) => {
  const idCell = xmlDocument.evaluate("@id", xmlFragment, null, XPathResult.STRING_TYPE, null);
  const id = idCell.stringValue.trim();

  const titleCell = xmlDocument.evaluate(
    "name[@type='primary']/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const title = titleCell.stringValue.trim();

  const yearPublishedCell = xmlDocument.evaluate(
    "yearpublished/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const yearPublished = yearPublishedCell.stringValue.trim();

  const minPlayersCell = xmlDocument.evaluate(
    "minplayers/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const minPlayers = minPlayersCell.stringValue.trim();

  const maxPlayersCell = xmlDocument.evaluate(
    "maxplayers/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const maxPlayers = maxPlayersCell.stringValue.trim();

  const bestWithPlayers = parseBestWithPlayers(xmlDocument, xmlFragment);

  const minPlayTimeCell = xmlDocument.evaluate(
    "minplaytime/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const minPlayTime = minPlayTimeCell.stringValue.trim();

  const maxPlayTimeCell = xmlDocument.evaluate(
    "maxplaytime/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const maxPlayTime = maxPlayTimeCell.stringValue.trim();

  const averageWeightCell = xmlDocument.evaluate(
    "statistics/ratings/averageweight/@value",
    xmlFragment,
    null,
    XPathResult.STRING_TYPE,
    null
  );
  const averageWeight = averageWeightCell.stringValue.trim();

  const categories = parseEntities(xmlDocument, xmlFragment, "boardgamecategory");
  const designers = parseEntities(xmlDocument, xmlFragment, "boardgamedesigner");
  const mechanics = parseEntities(xmlDocument, xmlFragment, "boardgamemechanic");

  return GameDetailState.create({
    id: parseInt(id, 10),
    title,
    designers,
    yearPublished: parseInt(yearPublished, 10),
    minPlayers: parseInt(minPlayers, 10),
    maxPlayers: parseInt(maxPlayers, 10),
    bestWithPlayers: parseInt(bestWithPlayers, 10),
    minPlayTime: parseInt(minPlayTime, 10),
    maxPlayTime: parseInt(maxPlayTime, 10),
    averageWeight: Number(averageWeight),
    categories,
    mechanics
  });
};

const parseGameDetails = xmlDocument => {
  const answer = {};

  // This gives the data items.
  const xpath = "query/results/items/item";
  const resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
  const rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
  let thisRow = rows.iterateNext();

  while (thisRow) {
    const gameDetail = parseGameDetail(xmlDocument, thisRow);
    answer[gameDetail.id] = gameDetail;

    thisRow = rows.iterateNext();
  }

  return answer;
};

const GameDetailFetcher = {};

GameDetailFetcher.fetchData = gameIds =>
  new Promise((resolve, reject) => {
    const reduceFunction = (accum, gameId) => {
      const gameDetail = GameDetail[gameId];
      return gameDetail ? R.assoc(gameDetail.id, gameDetail, accum) : accum;
    };
    const gameDetailMap0 = R.reduce(reduceFunction, {}, gameIds);
    const gameIds0 = R.map(detail => detail.id, Object.values(gameDetailMap0));
    const gameIds1 = R.difference(gameIds, gameIds0);

    if (gameIds1.length > 0) {
      const receiveData = xmlDocument => {
        const gameDetails = parseGameDetails(xmlDocument);
        resolve(R.merge(gameDetailMap0, gameDetails));
      };

      const url = createUrl(gameIds1);
      $.ajax(url)
        .done(receiveData)
        .fail((jqXHR, textStatus, errorThrown) => {
          console.error(errorThrown);
          reject(errorThrown);
        });
    } else {
      resolve(gameDetailMap0);
    }
  });

export default GameDetailFetcher;
