const Selector = {};

Selector.findGameCollectionsById = (state, id) => Selector.gameCollectionMap(state)[id];

Selector.findGameDetailById = (state, id) => Selector.gameDetailMap(state)[id];

Selector.findGameSummaryById = (state, id) => Selector.gameSummaryMap(state)[id];

Selector.gameCollectionMap = state => state.gameCollectionMap;

Selector.gameDetailMap = state => state.gameDetailMap;

Selector.gameSummaryMap = state => state.gameSummaryMap;

Selector.gameTotal = state => Selector.pageCount(state) * 100;

Selector.isCollectionsLoaded = state => {
  const usernames = Selector.usernames(state);
  const usernameToReceivedMap = Selector.usernameToReceivedMap(state);

  return usernames.reduce(
    (accumulator, username) => accumulator && usernameToReceivedMap[username] === true,
    true
  );
};

Selector.isDataLoaded = state => state.isDataLoaded;

Selector.isDetailsLoaded = state => {
  const { length } = Object.keys(Selector.gameDetailMap(state));
  const gameTotal = Selector.gameTotal(state);

  return length === gameTotal;
};

Selector.isSummariesLoaded = state => {
  const { length } = Object.keys(Selector.gameSummaryMap(state));
  const gameTotal = Selector.gameTotal(state);

  return length === gameTotal;
};

Selector.pageCount = state => state.pageCount;

Selector.usernameToReceivedMap = state => state.usernameToReceivedMap;

Selector.usernames = state => state.usernames;

export default Selector;
