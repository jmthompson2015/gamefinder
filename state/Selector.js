import GameDetail from "../artifact/GameDetail.js";
import ASelector from "../artifact/Selector.js";

const Selector = {};

const toInt = (string) => parseInt(string, 10);

Selector.actualDetailCount = (state) => Object.keys(state.gameToDetail).length;

Selector.actualSummaryCount = (state) =>
  Object.keys(state.gameToSummary).length;

Selector.boardGameRank = (state, gameId) => {
  let answer;
  const summary = Selector.gameSummary(state, gameId);

  if (summary) {
    answer = summary.boardGameRank;
  }

  if (answer === undefined) {
    const detail = Selector.gameDetail(state, gameId);

    if (detail) {
      answer = detail.boardGameRank;
    }
  }

  return answer;
};

Selector.expectedDetailCount = (state) =>
  Selector.gameIdsFromCollectionsAndSummaries(state).length;

Selector.expectedSummaryCount = (state) => Selector.pageCount(state) * 100;

Selector.filteredTableRows = (state) =>
  state.filteredReactTable ? state.filteredReactTable.filteredTableRows() : [];

Selector.gameDetail = (state, gameId) =>
  state.gameToDetail[gameId] || GameDetail[gameId];

Selector.gameIdsFromCollections = (state) =>
  R.map(toInt, R.uniq(Object.keys(state.gameToUsers)));

Selector.gameIdsFromCollectionsAndSummaries = (state) => {
  const gameIds1 = Selector.gameIdsFromCollections(state);
  const gameIds2 = Selector.gameIdsFromWishlists(state);
  const gameIds3 = Selector.gameIdsFromSummaries(state);

  return R.uniq(R.concat(gameIds1, R.concat(gameIds2, gameIds3)));
};

Selector.gameIdsFromSummaries = (state) =>
  R.map(toInt, Object.keys(state.gameToSummary));

Selector.gameIdsFromWishlists = (state) =>
  R.map(toInt, R.uniq(Object.keys(state.wishToUsers)));

Selector.gameSummary = (state, gameId) => state.gameToSummary[gameId];

Selector.gameUsers = (state, gameId) => state.gameToUsers[gameId] || [];

Selector.isCollectionsLoaded = (state) => {
  const userIds = ASelector.userIds();
  const { userToReceivedMap } = state;

  return R.reduce(
    (accum, userId) => accum && userToReceivedMap[userId] === true,
    true,
    userIds
  );
};

Selector.isDataLoaded = (state) => state.isDataLoaded;

Selector.isDetailsLoaded = (state) =>
  Selector.actualDetailCount(state) === Selector.expectedDetailCount(state);

Selector.isSummariesLoaded = (state) => {
  const pages = Array.from(Array(state.pageCount), (x, i) => i + 1);
  const { summaryToReceivedMap } = state;

  return R.reduce(
    (accum, page) => accum && summaryToReceivedMap[page] === true,
    true,
    pages
  );
};

Selector.isWishlistsLoaded = (state) => {
  const userIds = ASelector.userIds();
  const { userToReceivedMap2 } = state;

  return R.reduce(
    (accum, userId) => accum && userToReceivedMap2[userId] === true,
    true,
    userIds
  );
};

Selector.pageCount = (state) => state.pageCount;

Selector.userGames = (state, userId) => state.userToGames[userId] || [];

Selector.wishUsers = (state, gameId) => state.wishToUsers[gameId] || [];

export default Selector;
