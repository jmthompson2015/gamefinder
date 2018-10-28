import DefaultFilters from "./DefaultFilters.js";

const AppState = {};

AppState.create = ({
  pageCount = 5,
  tableRows = [],
  filteredTableRows = [],
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
  userToReceivedMap = {},
  filters = DefaultFilters.create()
} = {}) =>
  Immutable({
    pageCount,
    tableRows,
    filteredTableRows,
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
    // user ID to boolean
    userToReceivedMap,
    filters
  });

Object.freeze(AppState);

export default AppState;
