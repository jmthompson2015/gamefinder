import ActionType from "./ActionType.js";

const ActionCreator = {};

// See https://redux.js.org/recipes/reducing-boilerplate
const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

ActionCreator.addGameDetails = makeActionCreator(
  ActionType.ADD_GAME_DETAILS,
  "gameDetails"
);

ActionCreator.addGameSummaries = makeActionCreator(
  ActionType.ADD_GAME_SUMMARIES,
  "page",
  "gameSummaries"
);

ActionCreator.addUserCollection = makeActionCreator(
  ActionType.ADD_USER_COLLECTION,
  "userId",
  "gameIds"
);

ActionCreator.addUserWishlist = makeActionCreator(
  ActionType.ADD_USER_WISHLIST,
  "userId",
  "gameIds"
);

ActionCreator.setCollectionTime = makeActionCreator(
  ActionType.SET_COLLECTION_TIME,
  "time"
);

ActionCreator.setDetailTime = makeActionCreator(
  ActionType.SET_DETAIL_TIME,
  "time"
);

ActionCreator.setDisplayTab = makeActionCreator(
  ActionType.SET_DISPLAY_TAB,
  "displayTab"
);

ActionCreator.setFilteredReactTable = makeActionCreator(
  ActionType.SET_FILTERED_REACT_TABLE,
  "filteredReactTable"
);

ActionCreator.setPageCount = makeActionCreator(
  ActionType.SET_PAGE_COUNT,
  "pageCount"
);

ActionCreator.setSummaryTime = makeActionCreator(
  ActionType.SET_SUMMARY_TIME,
  "time"
);

ActionCreator.setWishlistTime = makeActionCreator(
  ActionType.SET_WISHLIST_TIME,
  "time"
);

Object.freeze(ActionCreator);

export default ActionCreator;
