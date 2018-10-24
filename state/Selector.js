import ASelector from "../artifact/Selector.js";

const Selector = {};

Selector.findGameDetailById = (state, id) => Selector.gameToDetail(state)[id];

Selector.findGameSummaryById = (state, id) => Selector.gameToSummary(state)[id];

Selector.findGameUsersByGameId = (state, id) => Selector.gameToUsers(state)[id] || [];

Selector.gameToDetail = state => state.gameToDetail;

Selector.gameToSummary = state => state.gameToSummary;

Selector.gameToUsers = state => state.gameToUsers;

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
  const { length } = Object.keys(Selector.gameToDetail(state));
  const gameTotal = Selector.gameTotal(state);

  return length === gameTotal;
};

Selector.isSummariesLoaded = state => {
  const { length } = Object.keys(Selector.gameToSummary(state));
  const gameTotal = Selector.gameTotal(state);

  return length === gameTotal;
};

Selector.pageCount = state => state.pageCount;

Selector.userToReceivedMap = state => state.userToReceivedMap;

export default Selector;
