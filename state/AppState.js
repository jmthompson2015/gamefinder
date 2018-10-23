import DefaultFilters from "./DefaultFilters.js";

const AppState = {};

AppState.create = ({
  pageCount = 5,
  gameDataMap = {},
  filteredGameData = [],
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
    filteredGameData,
    // game ID to array of users
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
