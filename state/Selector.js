import ASelector from "../artifact/Selector.js";

const Selector = {};

Selector.findGameCollectionsById = (state, id) => Selector.gameCollectionMap(state)[id] || [];

Selector.findGameDetailById = (state, id) => Selector.gameDetailMap(state)[id];

Selector.findGameSummaryById = (state, id) => Selector.gameSummaryMap(state)[id];

Selector.gameCollectionMap = state => state.gameCollectionMap;

Selector.gameDetailMap = state => state.gameDetailMap;

Selector.gameSummaryMap = state => state.gameSummaryMap;

Selector.gameTotal = state => Selector.pageCount(state) * 100;

Selector.isCollectionsLoaded = state => {
  const userIds = ASelector.userIds();
  const userToReceivedMap = Selector.userToReceivedMap(state);

  return userIds.reduce(
    (accumulator, userId) => accumulator && userToReceivedMap[userId] === true,
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

Selector.userToReceivedMap = state => state.userToReceivedMap;

export default Selector;
