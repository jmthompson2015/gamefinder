/* eslint no-console: ["error", { allow: ["warn"] }] */

import ASelector from "../artifact/Selector.js";

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";
import EntityUtils from "./EntityUtilities.js";
import Selector from "./Selector.js";
import TableRow from "./TableRow.js";

const Reducer = {};

Reducer.root = (state, action) => {
  // LOGGER.debug(`root() type = ${action.type}`);

  if (typeof state === "undefined") {
    return AppState.create();
  }

  let gameToDetail;
  let gameToSummary;
  let isDataLoaded;
  let newCategoryMap;
  let newDesignerMap;
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
  let newUserToReceivedMap2;
  let newUserToWishes;
  let newWishToUsers;

  switch (action.type) {
    case ActionType.ADD_GAME_DETAILS:
      gameToDetail = R.reduce(
        (accum, detail) => R.assoc(detail.id, detail, accum),
        {},
        action.gameDetails,
      );
      newGameToDetail = R.merge(state.gameToDetail, gameToDetail);
      isDataLoaded =
        Selector.expectedDetailCount(state) ===
        Object.keys(newGameToDetail).length;

      if (isDataLoaded) {
        newGameDetails = Object.values(newGameToDetail);
        newTableRows = Reducer.sortTableRows(
          Reducer.addTableRows(state, state.tableRows, newGameDetails),
        );
        newCategoryMap = EntityUtils.createCategoryMap(newGameDetails);
        newDesignerMap = EntityUtils.createDesignerMap(newGameDetails);
        newMechanicMap = EntityUtils.createMechanicMap(newGameDetails);
        newUserMap = EntityUtils.createUserMap(
          newGameDetails,
          state.gameToUsers,
        );

        return R.pipe(
          R.assoc("tableRows", newTableRows),
          R.assoc("gameToDetail", newGameToDetail),
          R.assoc("isDataLoaded", isDataLoaded),
          R.assoc("categoryMap", newCategoryMap),
          R.assoc("designerMap", newDesignerMap),
          R.assoc("mechanicMap", newMechanicMap),
          R.assoc("userMap", newUserMap),
        )(state);
      }
      return R.assoc("gameToDetail", newGameToDetail, state);
    case ActionType.ADD_GAME_SUMMARIES:
      // console.log(`Reducer gameToSummary.length = ${action.gameSummaries.length}`);
      gameToSummary = R.reduce(
        (accum, summary) => R.assoc(summary.id, summary, accum),
        {},
        action.gameSummaries,
      );
      newGameToSummary = R.merge(state.gameToSummary, gameToSummary);
      newSummaryToReceivedMap = R.assoc(
        action.page,
        true,
        state.summaryToReceivedMap,
      );
      return R.pipe(
        R.assoc("gameToSummary", newGameToSummary),
        R.assoc("summaryToReceivedMap", newSummaryToReceivedMap),
      )(state);
    case ActionType.ADD_USER_COLLECTION:
      // console.log(`Reducer gameIds.length = ${action.gameIds.length}`);
      newUserToGames = R.assoc(
        action.userId,
        action.gameIds,
        state.userToGames,
      );
      newUserToReceivedMap = R.assoc(
        action.userId,
        true,
        state.userToReceivedMap,
      );
      newGameToUsers = state.gameToUsers;
      R.forEach((id) => {
        const users = Selector.gameUsers(state, parseInt(id, 10));
        newGameToUsers = R.assoc(
          id,
          R.append(action.userId, users),
          newGameToUsers,
        );
      }, action.gameIds);
      return R.pipe(
        R.assoc("gameToUsers", newGameToUsers),
        R.assoc("userToGames", newUserToGames),
        R.assoc("userToReceivedMap", newUserToReceivedMap),
      )(state);
    case ActionType.ADD_USER_WISHLIST:
      newUserToWishes = R.assoc(
        action.userId,
        action.gameIds,
        state.userToWishes,
      );
      newUserToReceivedMap2 = R.assoc(
        action.userId,
        true,
        state.userToReceivedMap2,
      );
      newWishToUsers = state.wishToUsers;
      R.forEach((id) => {
        const users = Selector.wishUsers(state, parseInt(id, 10));
        newWishToUsers = R.assoc(
          id,
          R.append(action.userId, users),
          newWishToUsers,
        );
      }, action.gameIds);
      return R.pipe(
        R.assoc("wishToUsers", newWishToUsers),
        R.assoc("userToWishes", newUserToWishes),
        R.assoc("userToReceivedMap2", newUserToReceivedMap2),
      )(state);
    case ActionType.SET_COLLECTION_BUSY:
      // console.log(`Reducer collectionBusy = ${action.isBusy}`);
      return R.assoc("collectionBusy", action.isBusy, state);
    case ActionType.SET_COLLECTION_ERROR:
      // console.log(`Reducer collectionError = ${action.error}`);
      return R.assoc("collectionError", action.error, state);
    case ActionType.SET_COLLECTION_TIME:
      // console.log(`Reducer collectionTime = ${action.time}`);
      return R.assoc("collectionTime", action.time, state);
    case ActionType.SET_DETAIL_BUSY:
      // console.log(`Reducer detailBusy = ${action.isBusy}`);
      return R.assoc("detailBusy", action.isBusy, state);
    case ActionType.SET_DETAIL_ERROR:
      // console.log(`Reducer detailError = ${action.error}`);
      return R.assoc("detailError", action.error, state);
    case ActionType.SET_DETAIL_TIME:
      // console.log(`Reducer detailTime = ${action.time}`);
      return R.assoc("detailTime", action.time, state);
    case ActionType.SET_DISPLAY_TAB:
      return R.assoc("displayTab", action.displayTab, state);
    case ActionType.SET_FILTERED_REACT_TABLE:
      // console.log("Reducer SET_FILTERED_REACT_TABLE");
      return R.assoc("filteredReactTable", action.filteredReactTable, state);
    case ActionType.SET_PAGE_COUNT:
      // console.log(`Reducer pageCount = ${action.pageCount}`);
      return R.assoc("pageCount", action.pageCount, state);
    case ActionType.SET_SUMMARY_BUSY:
      // console.log(`Reducer summaryBusy = ${action.isBusy}`);
      return R.assoc("summaryBusy", action.isBusy, state);
    case ActionType.SET_SUMMARY_ERROR:
      // console.log(`Reducer summaryError = ${action.error}`);
      return R.assoc("summaryError", action.error, state);
    case ActionType.SET_SUMMARY_TIME:
      // console.log(`Reducer summaryTime = ${action.time}`);
      return R.assoc("summaryTime", action.time, state);
    case ActionType.SET_WISHLIST_BUSY:
      // console.log(`Reducer wishlistBusy = ${action.isBusy}`);
      return R.assoc("wishlistBusy", action.isBusy, state);
    case ActionType.SET_WISHLIST_ERROR:
      // console.log(`Reducer wishlistError = ${action.error}`);
      return R.assoc("wishlistError", action.error, state);
    case ActionType.SET_WISHLIST_TIME:
      // console.log(`Reducer wishlistTime = ${action.time}`);
      return R.assoc("wishlistTime", action.time, state);
    default:
      console.warn(`Reducer.root: Unhandled action type: ${action.type}`);
      return state;
  }
};

Reducer.addTableRows = (state, tableRows, gameDetails) => {
  const reduceFunction = (accum, gameDetail) => {
    // 1042: Expansion for Base-game
    if (
      Selector.boardGameRank(state, gameDetail.id) ||
      !gameDetail.categoryIds.includes(1042)
    ) {
      const gameSummary = Selector.gameSummary(
        state,
        parseInt(gameDetail.id, 10),
      );
      const userIds = Selector.gameUsers(state, parseInt(gameDetail.id, 10));
      const users = ASelector.usersByIds(userIds);
      const wisherIds = Selector.wishUsers(state, parseInt(gameDetail.id, 10));
      const wishers = ASelector.usersByIds(wisherIds);
      const newTableRow = TableRow.create({
        gameSummary,
        gameDetail,
        users,
        wishers,
      });

      return R.append(newTableRow, accum);
    }

    return accum;
  };
  const newTableRows = R.reduce(reduceFunction, [], gameDetails);

  return R.concat(tableRows, newTableRows);
};

Reducer.sortTableRows = (tableRows) =>
  R.sort(R.ascend(R.prop("boardGameRank")), tableRows);

Object.freeze(Reducer);

export default Reducer;
