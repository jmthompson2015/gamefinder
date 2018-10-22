import DefaultFilters from "./DefaultFilters.js";

const AppState = {};

AppState.create = ({
  pageCount = 5,
  usernames = ["ghightshoe", "jmthompson", "kmistr"],
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
  usernameMap = {},
  usernameToReceivedMap = {},
  filters = DefaultFilters.create()
} = {}) =>
  Immutable({
    pageCount,
    usernames,
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
    // user ID to object
    usernameMap,
    // username to boolean
    usernameToReceivedMap,
    filters
  });

Object.freeze(AppState);

export default AppState;
