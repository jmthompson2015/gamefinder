import DefaultFilters from "./DefaultFilters.js";

const AppState = {};

AppState.create = ({
  pageCount = 5,
  gameDataMap = {},
  filteredTableRows = [],
  gameCollectionMap = {},
  gameDetailMap = {},
  gameSummaryMap = {},
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
    // game ID to user IDs
    gameCollectionMap,
    // game ID to detail
    gameDetailMap,
    // game ID to summary
    gameSummaryMap,
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
