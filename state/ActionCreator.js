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

ActionCreator.addGameDetails = makeActionCreator(ActionType.ADD_GAME_DETAILS, "gameDetails");

ActionCreator.addGameSummaries = makeActionCreator(ActionType.ADD_GAME_SUMMARIES, "gameSummaries");

ActionCreator.addUserCollection = makeActionCreator(
  ActionType.ADD_USER_COLLECTION,
  "userId",
  "gameIds"
);

ActionCreator.applyFilters = makeActionCreator(ActionType.APPLY_FILTERS);

ActionCreator.removeFilters = makeActionCreator(ActionType.REMOVE_FILTERS);

ActionCreator.setCollectionTime = makeActionCreator(ActionType.SET_COLLECTION_TIME, "time");

ActionCreator.setDefaultFilters = makeActionCreator(ActionType.SET_DEFAULT_FILTERS);

ActionCreator.setDetailTime = makeActionCreator(ActionType.SET_DETAIL_TIME, "time");

ActionCreator.setFilter = makeActionCreator(ActionType.SET_FILTER, "filter");

ActionCreator.setPageCount = makeActionCreator(ActionType.SET_PAGE_COUNT, "pageCount");

ActionCreator.setSummaryTime = makeActionCreator(ActionType.SET_SUMMARY_TIME, "time");

Object.freeze(ActionCreator);

export default ActionCreator;
