/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import ASelector from "../artifact/Selector.js";

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";
import DefaultFilters from "./DefaultFilters.js";
import GameDataState from "./GameDataState.js";
import Selector from "./Selector.js";

const Reducer = {};

Reducer.root = (state, action) => {
  // LOGGER.debug(`root() type = ${action.type}`);

  if (typeof state === "undefined") {
    return AppState.create();
  }

  let gameData;
  let gameDetailKeys;
  let isDataLoaded;
  let newFilteredGameData;
  let newFilters;
  let newGameCollectionMap;
  let newGameDataMap;
  let newGameDetailMap;
  let newGameSummaryMap;
  let newUserToReceivedMap;
  let users;

  switch (action.type) {
    case ActionType.ADD_GAME_DETAILS:
      // console.log(`Reducer gameDetailMap length = ${Object.keys(action.gameDetailMap).length}`);
      newGameCollectionMap = state.gameCollectionMap;
      newGameDetailMap = R.merge(state.gameDetailMap, action.gameDetailMap);
      newGameDataMap = Reducer.addGameData(state, state.gameDataMap, action.gameDetailMap);
      gameDetailKeys = Object.keys(action.gameDetailMap);
      gameDetailKeys.forEach(id => {
        let newUsers = [];
        users = Selector.findGameCollectionsById(state, parseInt(id, 10));
        if (users && users.length > 0) {
          users.forEach(user => {
            const newUser = R.assoc("count", user.count + 1, user);
            newUsers = R.append(newUser, newUsers);
            newGameCollectionMap = R.assoc(id, newUsers, newGameCollectionMap);
          });
        }
      });
      gameData = Object.values(newGameDataMap);
      console.log(
        `Reducer ADD_GAME_DETAILS Selector.gameTotal(state) = ${Selector.gameTotal(state)}`
      );
      console.log(`Reducer ADD_GAME_DETAILS gameData.length = ${gameData.length}`);
      isDataLoaded = Selector.gameTotal(state) === gameData.length;
      newFilteredGameData = Reducer.sortGameData(gameData);
      return Object.assign({}, state, {
        filteredGameData: newFilteredGameData,
        gameCollectionMap: newGameCollectionMap,
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
      newGameCollectionMap = state.gameCollectionMap;
      action.gameIds.forEach(id => {
        let collections = Selector.findGameCollectionsById(state, parseInt(id, 10));
        if (collections === undefined) {
          collections = [];
        }
        collections.push(action.userId);
        newGameCollectionMap = R.assoc(id, collections, newGameCollectionMap);
      });
      return Object.assign({}, state, {
        gameCollectionMap: newGameCollectionMap,
        userToReceivedMap: newUserToReceivedMap
      });
    case ActionType.REMOVE_FILTERS:
      console.log("Reducer remove filters");
      gameData = Object.values(state.gameDataMap);
      newFilteredGameData = Reducer.sortGameData(gameData);
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
      gameData = Object.values(state.gameDataMap);
      newFilteredGameData = Reducer.filterGameData(gameData, newFilters);
      Reducer.saveToLocalStorage(newFilters);
      return Object.assign({}, state, {
        filters: newFilters,
        filteredGameData: newFilteredGameData
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

Reducer.addGameData = (state, gameDataMap0, newGameDetailMap) => {
  const gameDetails = Object.values(newGameDetailMap);
  let gameDataMap = gameDataMap0;

  gameDetails.forEach(gameDetail => {
    const gameSummary = Selector.findGameSummaryById(state, parseInt(gameDetail.id, 10));
    const gameCollections = Selector.findGameCollectionsById(state, parseInt(gameDetail.id, 10));
    const userIds = R.map(collection => collection.userId, gameCollections);
    const users = ASelector.usersByIds(userIds);

    if (gameSummary) {
      const newGameData = GameDataState.create({ gameSummary, gameDetail, users });
      gameDataMap = R.assoc(gameDetail.id, newGameData, gameDataMap);
    }
  });

  return gameDataMap;
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

Reducer.filterGameData = (gameData, filters) => {
  const answer = gameData.filter(data => Reducer.passes(data, filters));

  return Reducer.sortGameData(answer);
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

Reducer.sortGameData = gameData => gameData.sort((a, b) => a.boardGameRank - b.boardGameRank);

if (Object.freeze) {
  Object.freeze(Reducer);
}

export default Reducer;
