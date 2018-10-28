/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import ASelector from "../artifact/Selector.js";

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";
import DefaultFilters from "./DefaultFilters.js";
import EntityFilterUtils from "./EntityFilterUtilities.js";
import EntityUtils from "./EntityUtilities.js";
import RangeFilterUtils from "./RangeFilterUtilities.js";
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
  let newCategoryMap;
  let newDesignerMap;
  let newFilteredTableRows;
  let newFilters;
  let newGameDetails;
  let newGameToDetail;
  let newGameToSummary;
  let newGameToUsers;
  let newMechanicMap;
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

      newGameDetails = Object.values(newGameToDetail);
      newCategoryMap = EntityUtils.createCategoryMap(newGameDetails);
      newDesignerMap = EntityUtils.createDesignerMap(newGameDetails);
      newMechanicMap = EntityUtils.createMechanicMap(newGameDetails);

      isDataLoaded = Selector.gameTotal(state) === newTableRows.length;
      newFilteredTableRows = Reducer.sortTableRows(newTableRows);
      return R.pipe(
        R.assoc("filteredTableRows", newFilteredTableRows),
        R.assoc("gameToUsers", newGameToUsers),
        R.assoc("tableRows", newTableRows),
        R.assoc("gameToDetail", newGameToDetail),
        R.assoc("isDataLoaded", isDataLoaded),
        R.assoc("categoryMap", newCategoryMap),
        R.assoc("designerMap", newDesignerMap),
        R.assoc("mechanicMap", newMechanicMap)
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
    case ActionType.APPLY_FILTERS:
      console.log(`Reducer APPLY_FILTERS`);
      newFilteredTableRows = Reducer.filterTableRows(state.tableRows, state.filters);
      Reducer.saveToLocalStorage(state.filters);
      return R.assoc("filteredTableRows", newFilteredTableRows, state);
    case ActionType.REMOVE_FILTERS:
      console.log("Reducer REMOVE_FILTERS");
      newFilteredTableRows = Reducer.sortTableRows(state.tableRows);
      return R.assoc("filteredTableRows", newFilteredTableRows, state);
    case ActionType.SET_COLLECTION_TIME:
      console.log(`Reducer collectionTime = ${action.time}`);
      return R.assoc("collectionTime", action.time, state);
    case ActionType.SET_DEFAULT_FILTERS:
      console.log("Reducer SET_DEFAULT_FILTERS");
      newFilters = DefaultFilters.create();
      return R.assoc("filters", newFilters, state);
    case ActionType.SET_DETAIL_TIME:
      console.log(`Reducer detailTime = ${action.time}`);
      return R.assoc("detailTime", action.time, state);
    case ActionType.SET_FILTER:
      console.log(`Reducer SET_FILTER filter = ${JSON.stringify(action.filter)}`);
      newFilters = R.assoc(action.filter.columnKey, action.filter, state.filters);
      Reducer.saveToLocalStorage(newFilters);
      return R.assoc("filters", newFilters, state);
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
  const reduceFunction = (accum, gameDetail) => {
    const gameSummary = Selector.findGameSummaryById(state, parseInt(gameDetail.id, 10));
    const userIds = Selector.findGameUsersByGameId(state, parseInt(gameDetail.id, 10));
    const users = ASelector.usersByIds(userIds);
    const newTableRow = TableRow.create({ gameSummary, gameDetail, users });

    return R.append(newTableRow, accum);
  };
  const newTableRows = R.reduce(reduceFunction, [], gameDetails);

  return R.concat(tableRows, newTableRows);
};

Reducer.filterTableRows = (tableRows, filters) => {
  const answer = R.filter(data => Reducer.passes(data, filters), tableRows);

  return Reducer.sortTableRows(answer);
};

Reducer.passes = (data, filters) => {
  let answer = true;
  const propertyNames = Object.getOwnPropertyNames(filters);
  const entityColumnKeys = R.map(col => col.key, DefaultFilters.entityColumns);
  const rangeColumnKeys = R.map(col => col.key, DefaultFilters.rangeColumns);

  for (let i = 0; i < propertyNames.length; i += 1) {
    const propertyName = propertyNames[i];
    const filter = filters[propertyName];
    const isEntityColumn = entityColumnKeys.includes(propertyName);
    const isRangeColumn = rangeColumnKeys.includes(propertyName);
    const passes =
      (isEntityColumn && EntityFilterUtils.passes(filter, data)) ||
      (isRangeColumn && RangeFilterUtils.passes(filter, data));

    if (!passes) {
      answer = false;
      break;
    }
  }

  return answer;
};

Reducer.saveToLocalStorage = filters => {
  localStorage.filters = JSON.stringify(filters);
};

Reducer.sortTableRows = tableRows => R.sort(R.ascend(R.prop("boardGameRank")), tableRows);

if (Object.freeze) {
  Object.freeze(Reducer);
}

export default Reducer;
