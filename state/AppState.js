import DefaultFilters from "./DefaultFilters.js";

const AppState = {};

AppState.create = ({
  pageCount = 5,
  gameDataMap = {},
  filteredTableRows = [],
  gameSummaryMap = {},
  gameToDetail = {},
  gameToUsers = {},
  collectionTime,
  summaryTime,
  detailTime,
  isDataLoaded = false,
  categoryMap = {},
  designerMap = {},
  mechanicMap = {},
  userToReceivedMap = {},
  filters = DefaultFilters.create()
} = {}) =>
  Immutable({
    pageCount,
    gameDataMap,
    filteredTableRows,
    // game ID to summary
    gameSummaryMap,
    // game ID to detail
    gameToDetail,
    // game ID to user IDs
    gameToUsers,
    collectionTime,
    summaryTime,
    detailTime,
    isDataLoaded,
    categoryMap,
    designerMap,
    mechanicMap,
    // user ID to boolean
    userToReceivedMap,
    filters
  });

Object.freeze(AppState);

export default AppState;
