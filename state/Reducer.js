/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import ASelector from "../artifact/Selector.js";

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";
import DefaultFilters from "./DefaultFilters.js";
import Selector from "./Selector.js";
import TableRow from "./TableRow.js";

const Reducer = {};

Reducer.root = (state, action) => {
  // LOGGER.debug(`root() type = ${action.type}`);

  if (typeof state === "undefined") {
    return AppState.create();
  }

  let gameDetailIds;
  let gameToDetail;
  let gameToSummary;
  let isDataLoaded;
  let newFilteredGameData;
  let newFilters;
  let newGameToDetail;
  let newGameToSummary;
  let newGameToUsers;
  let newTableRows;
  let newUserToReceivedMap;

  switch (action.type) {
    case ActionType.ADD_GAME_DETAILS:
      newGameToUsers = state.gameToUsers;
      gameToDetail = R.reduce(
        (accum, detail) => R.assoc(detail.id, detail, accum),
        {},
        action.gameDetails
      );
      newGameToDetail = R.merge(state.gameToDetail, gameToDetail);
      newTableRows = Reducer.addTableRows(state, state.tableRows, action.gameDetails);
      gameDetailIds = R.map(detail => detail.id, action.gameDetails);
      R.forEach(id => {
        const users = Selector.findGameUsersByGameId(state, parseInt(id, 10));
        if (users && users.length > 0) {
          const newUsers = R.map(user => R.assoc("count", user.count + 1, user), users);
          newGameToUsers = R.assoc(id, newUsers, newGameToUsers);
        }
      }, gameDetailIds);
      console.log(
        `Reducer ADD_GAME_DETAILS Selector.gameTotal(state) = ${Selector.gameTotal(state)}`
      );
      console.log(`Reducer ADD_GAME_DETAILS newTableRows.length = ${newTableRows.length}`);
      isDataLoaded = Selector.gameTotal(state) === newTableRows.length;
      newFilteredGameData = Reducer.sortTableRows(newTableRows);
      return R.pipe(
        R.assoc("filteredTableRows", newFilteredGameData),
        R.assoc("gameToUsers", newGameToUsers),
        R.assoc("tableRows", newTableRows),
        R.assoc("gameToDetail", newGameToDetail),
        R.assoc("isDataLoaded", isDataLoaded)
      )(state);
    case ActionType.ADD_GAME_SUMMARIES:
      console.log(`Reducer gameToSummary.length = ${action.gameSummaries.length}`);
      gameToSummary = R.reduce(
        (accum, summary) => R.assoc(summary.id, summary, accum),
        {},
        action.gameSummaries
      );
      newGameToSummary = R.merge(state.gameToSummary, gameToSummary);
      return R.assoc("gameToSummary", newGameToSummary, state);
    case ActionType.ADD_USER_COLLECTION:
      console.log(`Reducer gameIds.length = ${action.gameIds.length}`);
      newUserToReceivedMap = R.assoc(action.userId, true, state.userToReceivedMap);
      newGameToUsers = state.gameToUsers;
      R.forEach(id => {
        const users = Selector.findGameUsersByGameId(state, parseInt(id, 10)) || [];
        newGameToUsers = R.assoc(id, R.append(action.userId, users), newGameToUsers);
      }, action.gameIds);
      return R.pipe(
        R.assoc("gameToUsers", newGameToUsers),
        R.assoc("userToReceivedMap", newUserToReceivedMap)
      )(state);
    case ActionType.REMOVE_FILTERS:
      console.log("Reducer remove filters");
      newFilteredGameData = Reducer.sortGameData(state.tableRows);
      return R.assoc("filteredGameData", newFilteredGameData, state);
    case ActionType.SET_COLLECTION_TIME:
      console.log(`Reducer collectionTime = ${action.time}`);
      return R.assoc("collectionTime", action.time, state);
    case ActionType.SET_DEFAULT_FILTERS:
      console.log("Reducer set default filters");
      newFilters = DefaultFilters.create();
      return R.assoc("filters", newFilters, state);
    case ActionType.SET_DETAIL_TIME:
      console.log(`Reducer detailTime = ${action.time}`);
      return R.assoc("detailTime", action.time, state);
    case ActionType.SET_FILTERS:
      console.log(`Reducer filters = ${action.filters}`);
      R.forEach(columnKey => {
        console.log(`${columnKey}: ${action.filters[columnKey]}`);
      }, Object.getOwnPropertyNames(action.filters));
      newFilters = R.merge(state.filters, action.filters);
      newFilteredGameData = Reducer.filterTableRows(state.tableRows, newFilters);
      Reducer.saveToLocalStorage(newFilters);
      return R.pipe(
        R.assoc("filters", newFilters),
        R.assoc("filteredTableRows", newFilteredGameData)
      )(state);
    case ActionType.SET_PAGE_COUNT:
      console.log(`Reducer pageCount = ${action.pageCount}`);
      return R.assoc("pageCount", action.pageCount, state);
    case ActionType.SET_SUMMARY_TIME:
      console.log(`Reducer summaryTime = ${action.time}`);
      return R.assoc("summaryTime", action.time, state);
    default:
      console.warn(`Reducer.root: Unhandled action type: ${action.type}`);
      return state;
  }
};

Reducer.addTableRows = (state, tableRows, gameDetails) => {
  let answer = tableRows;

  R.forEach(gameDetail => {
    const gameSummary = Selector.findGameSummaryById(state, parseInt(gameDetail.id, 10));

    if (gameSummary) {
      const userIds = Selector.findGameUsersByGameId(state, parseInt(gameDetail.id, 10));
      const users = ASelector.usersByIds(userIds);
      const newTableRow = TableRow.create({ gameSummary, gameDetail, users });
      answer = R.append(newTableRow, answer);
    }
  }, gameDetails);

  return answer;
};

Reducer.filterTableRows = (tableRows, filters) => {
  const answer = tableRows.filter(data => Reducer.passes(data, filters));

  return Reducer.sortTableRows(answer);
};

Reducer.passes = (data, filters) => {
  let answer = true;
  const propertyNames = Object.getOwnPropertyNames(filters);

  for (let i = 0; i < propertyNames.length; i += 1) {
    const propertyName = propertyNames[i];
    const filter = filters[propertyName];

    if (!filter.passes(data)) {
      answer = false;
      break;
    }
  }

  return answer;
};

Reducer.saveToLocalStorage = filters => {
  const filterObjects = R.map(
    columnKey => filters[columnKey].toObject(),
    Object.getOwnPropertyNames(filters)
  );

  localStorage.filters = JSON.stringify(filterObjects);
};

Reducer.sortTableRows = tableRows => R.sort(R.ascend(R.prop("boardGameRank")), tableRows);

if (Object.freeze) {
  Object.freeze(Reducer);
}

export default Reducer;
