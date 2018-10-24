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

  let gameDetailKeys;
  let isDataLoaded;
  let newFilteredGameData;
  let newFilters;
  let newGameDataMap;
  let newGameDetailMap;
  let newGameSummaryMap;
  let newGameToUsers;
  let newUserToReceivedMap;
  let tableRows;
  let users;

  switch (action.type) {
    case ActionType.ADD_GAME_DETAILS:
      // console.log(`Reducer gameDetailMap length = ${Object.keys(action.gameDetailMap).length}`);
      newGameToUsers = state.gameToUsers;
      newGameDetailMap = R.merge(state.gameDetailMap, action.gameDetailMap);
      newGameDataMap = Reducer.addTableRows(state, state.tableRows, action.gameDetailMap);
      gameDetailKeys = Object.keys(action.gameDetailMap);
      gameDetailKeys.forEach(id => {
        let newUsers = [];
        users = Selector.findGameUsersByGameId(state, parseInt(id, 10));
        if (users && users.length > 0) {
          users.forEach(user => {
            const newUser = R.assoc("count", user.count + 1, user);
            newUsers = R.append(newUser, newUsers);
            newGameToUsers = R.assoc(id, newUsers, newGameToUsers);
          });
        }
      });
      tableRows = Object.values(newGameDataMap);
      console.log(
        `Reducer ADD_GAME_DETAILS Selector.gameTotal(state) = ${Selector.gameTotal(state)}`
      );
      console.log(`Reducer ADD_GAME_DETAILS tableRows.length = ${tableRows.length}`);
      isDataLoaded = Selector.gameTotal(state) === tableRows.length;
      newFilteredGameData = Reducer.sortTableRows(tableRows);
      return Object.assign({}, state, {
        filteredTableRows: newFilteredGameData,
        gameToUsers: newGameToUsers,
        gameDataMap: newGameDataMap,
        gameDetailMap: newGameDetailMap,
        isDataLoaded
      });
    case ActionType.ADD_GAME_SUMMARIES:
      console.log(`Reducer gameSummaryMap.length = ${Object.keys(action.gameSummaryMap).length}`);
      newGameSummaryMap = R.merge(state.gameSummaryMap, action.gameSummaryMap);
      return Object.assign({}, state, {
        gameSummaryMap: newGameSummaryMap
      });
    case ActionType.ADD_USER_COLLECTION:
      console.log(`Reducer gameIds.length = ${action.gameIds.length}`);
      newUserToReceivedMap = R.assoc(action.userId, true, state.userToReceivedMap);
      newGameToUsers = state.gameToUsers;
      action.gameIds.forEach(id => {
        let collections = Selector.findGameUsersByGameId(state, parseInt(id, 10));
        if (collections === undefined) {
          collections = [];
        }
        collections.push(action.userId);
        newGameToUsers = R.assoc(id, collections, newGameToUsers);
      });
      return Object.assign({}, state, {
        gameToUsers: newGameToUsers,
        userToReceivedMap: newUserToReceivedMap
      });
    case ActionType.REMOVE_FILTERS:
      console.log("Reducer remove filters");
      tableRows = Object.values(state.gameDataMap);
      newFilteredGameData = Reducer.sortGameData(tableRows);
      return Object.assign({}, state, {
        filteredGameData: newFilteredGameData
      });
    case ActionType.SET_COLLECTION_TIME:
      console.log(`Reducer collectionTime = ${action.time}`);
      return Object.assign({}, state, {
        collectionTime: action.time
      });
    case ActionType.SET_DEFAULT_FILTERS:
      console.log("Reducer set default filters");
      newFilters = DefaultFilters.create();
      return Object.assign({}, state, {
        filters: newFilters
      });
    case ActionType.SET_DETAIL_TIME:
      console.log(`Reducer detailTime = ${action.time}`);
      return Object.assign({}, state, {
        detailTime: action.time
      });
    case ActionType.SET_FILTERS:
      console.log(`Reducer filters = ${action.filters}`);
      Object.getOwnPropertyNames(action.filters).forEach(columnKey => {
        console.log(`${columnKey}: ${action.filters[columnKey]}`);
      });
      newFilters = R.merge(state.filters, action.filters);
      tableRows = Object.values(state.gameDataMap);
      newFilteredGameData = Reducer.filterTableRows(tableRows, newFilters);
      Reducer.saveToLocalStorage(newFilters);
      return Object.assign({}, state, {
        filters: newFilters,
        filteredTableRows: newFilteredGameData
      });
    case ActionType.SET_PAGE_COUNT:
      console.log(`Reducer pageCount = ${action.pageCount}`);
      return Object.assign({}, state, {
        pageCount: action.pageCount
      });
    case ActionType.SET_SUMMARY_TIME:
      console.log(`Reducer summaryTime = ${action.time}`);
      return Object.assign({}, state, {
        summaryTime: action.time
      });
    default:
      console.warn(`Reducer.root: Unhandled action type: ${action.type}`);
      return state;
  }
};

Reducer.addTableRows = (state, tableRows0, newGameDetailMap) => {
  const gameDetails = Object.values(newGameDetailMap);
  let tableRows = tableRows0;

  gameDetails.forEach(gameDetail => {
    const gameSummary = Selector.findGameSummaryById(state, parseInt(gameDetail.id, 10));
    const gameCollections = Selector.findGameUsersByGameId(state, parseInt(gameDetail.id, 10));
    const userIds = R.map(collection => collection.userId, gameCollections);
    const users = ASelector.usersByIds(userIds);

    if (gameSummary) {
      const newTableRow = TableRow.create({ gameSummary, gameDetail, users });
      tableRows = R.assoc(gameDetail.id, newTableRow, tableRows);
    }
  });

  return tableRows;
};

Reducer.entityMap = (state, newEntityMap0, newEntityIds) => {
  const newEntityMap = newEntityMap0;

  newEntityIds.forEach(newEntityId => {
    const entity = newEntityMap[newEntityId];

    if (entity) {
      newEntityMap[newEntityId] = R.assoc("count", entity.count + 1, entity);
    } else {
      const newEntity = ASelector.entity(newEntityId);
      newEntityMap[newEntityId] = R.assoc("count", 1, newEntity);
    }
  });
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
  const filterObjects = [];

  Object.getOwnPropertyNames(filters).forEach(columnKey => {
    const filter = filters[columnKey];
    filterObjects.push(filter.toObject());
  });

  localStorage.filters = JSON.stringify(filterObjects);
};

Reducer.sortTableRows = tableRows => tableRows.sort((a, b) => a.boardGameRank - b.boardGameRank);

if (Object.freeze) {
  Object.freeze(Reducer);
}

export default Reducer;
