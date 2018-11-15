/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import ASelector from "../artifact/Selector.js";

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";
import DefaultFilters from "./DefaultFilters.js";
import EntityUtils from "./EntityUtilities.js";
import FilterUtils from "./FilterUtilities.js";
import Selector from "./Selector.js";
import TableRow from "./TableRow.js";

const Reducer = {};

Reducer.root = (state, action) => {
  // LOGGER.debug(`root() type = ${action.type}`);

  if (typeof state === "undefined") {
    return AppState.create({ filters: Reducer.loadFromLocalStorage() });
  }

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
  let newSummaryToReceivedMap;
  let newTableRows;
  let newUserMap;
  let newUserToGames;
  let newUserToReceivedMap;

  switch (action.type) {
    case ActionType.ADD_GAME_DETAILS:
      gameToDetail = R.reduce(
        (accum, detail) => R.assoc(detail.id, detail, accum),
        {},
        action.gameDetails
      );
      newGameToDetail = R.merge(state.gameToDetail, gameToDetail);
      isDataLoaded = Selector.expectedDetailCount(state) === Object.keys(newGameToDetail).length;

      if (isDataLoaded) {
        newGameDetails = Object.values(newGameToDetail);
        newTableRows = Reducer.addTableRows(state, state.tableRows, newGameDetails);
        newFilteredTableRows = Reducer.sortTableRows(newTableRows);
        newCategoryMap = EntityUtils.createCategoryMap(newGameDetails);
        newDesignerMap = EntityUtils.createDesignerMap(newGameDetails);
        newMechanicMap = EntityUtils.createMechanicMap(newGameDetails);
        newUserMap = EntityUtils.createUserMap(newGameDetails, state.gameToUsers);

        return R.pipe(
          R.assoc("filteredTableRows", newFilteredTableRows),
          R.assoc("tableRows", newTableRows),
          R.assoc("gameToDetail", newGameToDetail),
          R.assoc("isDataLoaded", isDataLoaded),
          R.assoc("categoryMap", newCategoryMap),
          R.assoc("designerMap", newDesignerMap),
          R.assoc("mechanicMap", newMechanicMap),
          R.assoc("userMap", newUserMap)
        )(state);
      }
      return R.assoc("gameToDetail", newGameToDetail, state);
    case ActionType.ADD_GAME_SUMMARIES:
      // console.log(`Reducer gameToSummary.length = ${action.gameSummaries.length}`);
      gameToSummary = R.reduce(
        (accum, summary) => R.assoc(summary.id, summary, accum),
        {},
        action.gameSummaries
      );
      newGameToSummary = R.merge(state.gameToSummary, gameToSummary);
      newSummaryToReceivedMap = R.assoc(action.page, true, state.summaryToReceivedMap);
      return R.pipe(
        R.assoc("gameToSummary", newGameToSummary),
        R.assoc("summaryToReceivedMap", newSummaryToReceivedMap)
      )(state);
    case ActionType.ADD_USER_COLLECTION:
      // console.log(`Reducer gameIds.length = ${action.gameIds.length}`);
      newUserToGames = R.assoc(action.userId, action.gameIds, state.userToGames);
      newUserToReceivedMap = R.assoc(action.userId, true, state.userToReceivedMap);
      newGameToUsers = state.gameToUsers;
      R.forEach(id => {
        const users = Selector.gameUsers(state, parseInt(id, 10));
        newGameToUsers = R.assoc(id, R.append(action.userId, users), newGameToUsers);
      }, action.gameIds);
      return R.pipe(
        R.assoc("gameToUsers", newGameToUsers),
        R.assoc("userToGames", newUserToGames),
        R.assoc("userToReceivedMap", newUserToReceivedMap)
      )(state);
    case ActionType.APPLY_FILTERS:
      // console.log(`Reducer APPLY_FILTERS`);
      newFilteredTableRows = Reducer.filterTableRows(state.tableRows, state.filters);
      Reducer.saveToLocalStorage(state.filters);
      return R.assoc("filteredTableRows", newFilteredTableRows, state);
    case ActionType.REMOVE_FILTERS:
      // console.log("Reducer REMOVE_FILTERS");
      newFilteredTableRows = Reducer.sortTableRows(state.tableRows);
      return R.assoc("filteredTableRows", newFilteredTableRows, state);
    case ActionType.SET_COLLECTION_TIME:
      console.log(`Reducer collectionTime = ${action.time}`);
      return R.assoc("collectionTime", action.time, state);
    case ActionType.SET_DEFAULT_FILTERS:
      // console.log("Reducer SET_DEFAULT_FILTERS");
      newFilters = DefaultFilters.create();
      return R.assoc("filters", newFilters, state);
    case ActionType.SET_DETAIL_TIME:
      console.log(`Reducer detailTime = ${action.time}`);
      return R.assoc("detailTime", action.time, state);
    case ActionType.SET_DISPLAY_TAB:
      return R.assoc("displayTab", action.displayTab, state);
    case ActionType.SET_FILTER:
      // console.log(`Reducer SET_FILTER filter = ${JSON.stringify(action.filter)}`);
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
    // 1042: Expansion for Base-game
    if (Selector.boardGameRank(state, gameDetail.id) || !gameDetail.categoryIds.includes(1042)) {
      const gameSummary = Selector.gameSummary(state, parseInt(gameDetail.id, 10));
      const userIds = Selector.gameUsers(state, parseInt(gameDetail.id, 10));
      const users = ASelector.usersByIds(userIds);
      const newTableRow = TableRow.create({ gameSummary, gameDetail, users });

      return R.append(newTableRow, accum);
    }

    return accum;
  };
  const newTableRows = R.reduce(reduceFunction, [], gameDetails);

  return R.concat(tableRows, newTableRows);
};

Reducer.filterTableRows = (tableRows, filters) => {
  const answer = R.filter(data => FilterUtils.passesAll(filters, data), tableRows);

  return Reducer.sortTableRows(answer);
};

Reducer.loadFromLocalStorage = () =>
  localStorage.filters ? JSON.parse(localStorage.filters) : undefined;

Reducer.saveToLocalStorage = filters => {
  localStorage.filters = JSON.stringify(filters);
};

Reducer.sortTableRows = tableRows => R.sort(R.ascend(R.prop("boardGameRank")), tableRows);

if (Object.freeze) {
  Object.freeze(Reducer);
}

export default Reducer;
