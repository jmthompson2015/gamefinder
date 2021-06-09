const AppState = {};

AppState.create = ({
  pageCount = 20,
  tableRows = [],
  filteredReactTable,
  displayTab = "Game Table",
  gameToDetail = {},
  gameToSummary = {},
  gameToUsers = {},
  wishToUsers = {},
  collectionTime,
  wishlistTime,
  summaryTime,
  detailTime,
  isDataLoaded = false,
  categoryMap = {},
  designerMap = {},
  mechanicMap = {},
  userMap = {},
  userToGames = {},
  userToWishes = {},
  summaryToReceivedMap = {},
  userToReceivedMap = {},
  userToReceivedMap2 = {},
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
    wishToUsers,
    collectionTime,
    wishlistTime,
    summaryTime,
    detailTime,
    isDataLoaded,
    categoryMap,
    designerMap,
    mechanicMap,
    userMap,
    // user ID to game IDs
    userToGames,
    userToWishes,
    // summary page to boolean
    summaryToReceivedMap,
    // user ID to boolean
    userToReceivedMap,
    userToReceivedMap2,
  });

Object.freeze(AppState);

export default AppState;
