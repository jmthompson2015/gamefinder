const AppState = {};

AppState.create = ({
  pageCount = 5,
  tableRows = [],
  filteredReactTable,
  displayTab = "Game Table",
  gameToDetail = {},
  gameToSummary = {},
  gameToUsers = {},
  collectionTime,
  summaryTime,
  detailTime,
  isDataLoaded = false,
  categoryMap = {},
  designerMap = {},
  mechanicMap = {},
  userMap = {},
  userToGames = {},
  summaryToReceivedMap = {},
  userToReceivedMap = {}
} = {}) =>
  Immutable({
    pageCount,
    tableRows,
    filteredReactTable,
    displayTab,
    // game ID to detail
    gameToDetail,
    // game ID to summary
    gameToSummary,
    // game ID to user IDs
    gameToUsers,
    collectionTime,
    summaryTime,
    detailTime,
    isDataLoaded,
    categoryMap,
    designerMap,
    mechanicMap,
    userMap,
    // user ID to game IDs
    userToGames,
    // summary page to boolean
    summaryToReceivedMap,
    // user ID to boolean
    userToReceivedMap
  });

Object.freeze(AppState);

export default AppState;
